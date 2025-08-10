// This is the full code for api/contact.js

// 1. Import the necessary tools
import { sql } from '@vercel/postgres'; // The tool for talking to our Vercel Postgres database
import { Resend } from 'resend'; // The tool for sending emails with Resend

// 3. This is the main function that runs when someone accesses this API endpoint
export default async function handler(req, res) {
  // 4. We only want to handle POST requests, which is what our form will send.
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  // --- NEW DEBUGGING LINE ---
  // Let's check if the environment variable is even visible to the function.
  console.log('Is RESEND_API_KEY present:', !!process.env.RESEND_API_KEY);

  // 5. Use a try...catch block. This is a best practice for handling potential errors.
  try {
    // --- MOVED INITIALIZATION INSIDE TRY BLOCK ---
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 6. Get the form data from the incoming request. The `req.body` contains the form submission.
    const { name, email, phone, message } = req.body;

    // 7. --- IMPORTANT: Backend Validation ---
    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required.' });
    }

    // 8. Insert the validated data into your Postgres database.
    await sql`
      INSERT INTO contacts (name, email, phone, message)
      VALUES (${name}, ${email}, ${phone}, ${message || ''});
    `;

    // 9. --- IMPORTANT: Send yourself an email notification ---
    await resend.emails.send({
      from: 'onboarding@resend.dev', // This is required by Resend's free plan for unverified domains
      to: 'keshavaggarwal1234@gmail.com', // Your email address
      subject: `New Contact Form Lead: ${name}`,
      html: `
        <h1>New Lead from Digital Forge Website</h1>
        <p>You have a new submission from your contact form.</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
        </ul>
        <p><strong>Message:</strong></p>
        <p>${message || 'No message provided.'}</p>
      `,
    });

    // 10. Send a success response back to the frontend.
    return res.status(200).json({ message: 'Your message has been sent successfully!' });

  } catch (error) {
    // 11. If any error occurs in the `try` block, this code will run.
    console.error('An error occurred:', error);
    return res.status(500).json({ message: 'An internal server error occurred.' });
  }
}

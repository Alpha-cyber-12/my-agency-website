// This is the full code for api/contact.js

// 1. Import the necessary tools
import { sql } from '@vercel/postgres'; // The tool for talking to our Vercel Postgres database
import { Resend } from 'resend'; // The tool for sending emails with Resend

// 2. Initialize Resend with our secret API key
const resend = new Resend(process.env.RESEND_API_KEY);

// 3. This is the main function that runs when someone accesses this API endpoint
export default async function handler(req, res) {
  // 4. We only want to handle POST requests, which is what our form will send.
  // If someone tries to access this URL directly in their browser (a GET request), we'll reject it.
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  // 5. Use a try...catch block. This is a best practice for handling potential errors.
  try {
    // 6. Get the form data from the incoming request. The `req.body` contains the form submission.
    const { name, email, phone, message } = req.body;

    // 7. --- IMPORTANT: Backend Validation ---
    // Always validate data on the backend, never just trust the frontend.
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    // You can add more specific validation here if you want

    // 8. Insert the validated data into your Postgres database.
    // The `sql` template tag automatically protects against SQL injection attacks.
    await sql`
      INSERT INTO contacts (name, email, phone, message)
      VALUES (${name}, ${email}, ${phone}, ${message});
    `;

    // 9. --- IMPORTANT: Send yourself an email notification ---
    await resend.emails.send({
      from: 'onboarding@resend.dev', // This is required by Resend's free plan for unverified domains
      to: 'keshavaggarwal1234@gmail.com', // <-- CHANGE THIS to your actual email address!
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
        <p>${message}</p>
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
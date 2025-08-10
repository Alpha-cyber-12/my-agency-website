// This is a simplified test function to isolate the issue.

export default async function handler(req, res) {
  // Log that the function was called, as the very first step.
  console.log('--- Contact API function was invoked ---');
  console.log('Request Method:', req.method);

  // We only want to handle POST requests.
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  try {
    // Log the body to see what we receive.
    console.log('Request Body:', req.body);
    
    // Return a simple success message.
    return res.status(200).json({ message: 'Test successful! The API endpoint is working.' });

  } catch (error) {
    // If anything goes wrong, log the error.
    console.error('An error occurred in the test function:', error);
    return res.status(500).json({ message: 'An internal server error occurred.' });
  }
}

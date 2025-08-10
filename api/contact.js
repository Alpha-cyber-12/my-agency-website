// This is the absolute simplest test function to confirm the endpoint is reachable.

export default async function handler(req, res) {
  // Log that the function was called, as the very first step.
  console.log('--- ULTRA SIMPLE test function was invoked ---');
  
  // Immediately return a success message without checking anything else.
  return res.status(200).json({ message: 'The simplest test was successful!' });
}

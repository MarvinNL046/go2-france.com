import type { NextApiRequest, NextApiResponse } from 'next';

interface NewsletterResponse {
  success: boolean;
  message: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewsletterResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Use POST.',
    });
  }

  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Email address is required.',
    });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
    });
  }

  // In production, this would integrate with an email service (e.g., Mailchimp, ConvertKit, Brevo)
  // For now, we acknowledge the signup
  console.log(`Newsletter signup: ${email}`);

  return res.status(200).json({
    success: true,
    message: 'Thank you for subscribing to the Go2France newsletter!',
  });
}

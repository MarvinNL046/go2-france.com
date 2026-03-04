import type { NextApiRequest, NextApiResponse } from 'next';

interface ContactResponse {
  success: boolean;
  message: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Use POST.',
    });
  }

  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Name is required.',
    });
  }

  if (!email || typeof email !== 'string') {
    return res.status(400).json({
      success: false,
      message: 'Email address is required.',
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.',
    });
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Message is required.',
    });
  }

  // In production, this would send an email (e.g., via SendGrid, Resend, or store in a database)
  console.log(`Contact form submission:`, {
    name: name.trim(),
    email: email.trim(),
    subject: subject || 'General',
    messageLength: message.trim().length,
  });

  return res.status(200).json({
    success: true,
    message: 'Thank you for your message. We will get back to you within 2-3 business days.',
  });
}

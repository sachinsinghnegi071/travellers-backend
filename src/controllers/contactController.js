import ContactMessage from '../models/ContactMessage.js';

// Submit a new support/contact message
export const createContactMessage = async (req, res) => {
  try {
    const { userEmail, userRole, message } = req.body;

    if (!userEmail || !message) {
      return res.status(400).json({ success: false, message: 'Please provide email and message.' });
    }

    const contactMsg = await ContactMessage.create({
      userEmail,
      userRole: userRole || 'traveller',
      message
    });

    res.status(201).json({
      success: true,
      message: 'Support request submitted successfully. We will get back to you shortly!',
      contactMsg
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Retrieve all messages (restricted to Admins)
export const getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: messages.length, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: [true, 'Please provide an email address'],
      lowercase: true,
      trim: true
    },
    userRole: {
      type: String,
      enum: ['traveller', 'hotel', 'admin', 'user'],
      default: 'traveller'
    },
    message: {
      type: String,
      required: [true, 'Please provide a message']
    }
  },
  { timestamps: true }
);

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
export default ContactMessage;

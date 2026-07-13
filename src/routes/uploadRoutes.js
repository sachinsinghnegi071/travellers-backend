import express from 'express';
import { upload, uploadToCloudinary } from '../middleware/uploadMiddleware.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload an image file.' });
    }

    let imageUrl = null;

    // 1. Try to upload to Cloudinary if keys are defined
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      const response = await uploadToCloudinary(req.file.path);
      if (response && response.secure_url) {
        imageUrl = response.secure_url;
      }
    }

    // 2. Fallback to serving the locally uploaded file
    if (!imageUrl) {
      // Normalize path to use forward slashes for URLs
      const normalizedPath = req.file.path.replace(/\\/g, '/');
      const baseUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;
      imageUrl = `${baseUrl}/${normalizedPath}`;
    }

    res.status(200).json({
      success: true,
      url: imageUrl,
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

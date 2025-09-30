// routes/events.js
import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/event_images/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// POST endpoint to handle event upload
router.post('/upload-event', upload.single('image'), (req, res) => {
  console.log('Form fields:', req.body);   // text fields like title, fee, etc.
  console.log('File info:', req.file);     // uploaded file info

  res.json({
    success: true,
    message: 'Event uploaded',
    filePath: req.file.path
  });
});

export default router;

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/messages/';
    // Ensure directory exists
    const fs = require('fs');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    // Allow common file types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Type de fichier non autorisé. Types autorisés: ' + allowedTypes.join(', ')), false);
    }
  }
});

const {
  createMessage,
  getAllMessages,
  getMessageById,
  getMessagesByUserId,
  getMessagesBySender,
  updateMessage,
  deleteMessage
} = require("../controllers/messageController");

// Apply auth middleware to all routes
router.use(authMiddleware);

// Create message (file upload optional)
router.post("/", upload.any(), (req, res, next) => {
  console.log('=== ROUTE DEBUG ===');
  console.log('Request file:', req.file);
  console.log('Request files:', req.files);
  console.log('Request body:', req.body);
  
  // Handle files from upload.any() - files come in req.files array
  if (req.files && req.files.length > 0) {
    console.log('Processing', req.files.length, 'files from req.files array');
    // Get the first file (assuming single file upload)
    const uploadedFile = req.files[0];
    console.log('First file details:', uploadedFile);
    if (uploadedFile.fieldname === 'file') {
      req.file = uploadedFile;
      console.log('✅ Successfully moved file to req.file:', req.file);
    } else {
      console.log('❌ File fieldname is not "file":', uploadedFile.fieldname);
    }
  } else {
    console.log('❌ No files found in req.files array');
  }
  
  console.log('Processing message creation...');
  next(); // Continue to controller
}, createMessage);

// Get all messages
router.get("/", getAllMessages);

// Get message by ID
router.get("/:id", getMessageById);

// Get messages by user ID
router.get("/user/:userId", getMessagesByUserId);

// Get messages by sender
router.get("/sender/:sender", getMessagesBySender);

// Update message
router.put("/:id", updateMessage);

// Delete message
router.delete("/:id", deleteMessage);

module.exports = router;

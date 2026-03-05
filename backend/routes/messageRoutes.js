const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
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

// Create message
router.post("/", createMessage);

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

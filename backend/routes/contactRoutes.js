const express = require('express');
const router = express.Router();
const {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
  markMessageAsRead,
  deleteContactMessage
} = require('../controllers/contactController');

// POST /api/contact - Create new contact message (public)
router.post('/', createContactMessage);

// GET /api/contact - Get all contact messages (admin)
router.get('/', getAllContactMessages);

// GET /api/contact/:id - Get single contact message (admin)
router.get('/:id', getContactMessageById);

// PUT /api/contact/:id/read - Mark message as read (admin)
router.put('/:id/read', markMessageAsRead);

// DELETE /api/contact/:id - Delete contact message (admin)
router.delete('/:id', deleteContactMessage);

module.exports = router;

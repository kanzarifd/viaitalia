const express = require('express');
const router = express.Router();
const {
  getUserNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification
} = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get all notifications for the authenticated user
router.get('/', authMiddleware, getUserNotifications);

// Get unread notifications count for the authenticated user
router.get('/unread/count', authMiddleware, getUnreadCount);

// Mark a specific notification as read
router.put('/:id/read', authMiddleware, markAsRead);

// Mark all notifications as read for the authenticated user
router.put('/read-all', authMiddleware, markAllAsRead);

// Delete a specific notification
router.delete('/:id', authMiddleware, deleteNotification);

// Test endpoint to create a notification (for testing only)
router.post('/test', async (req, res) => {
  try {
    const prisma = require('../config/prisma');
    
    // Create a test notification for user ID 4 (fadi2 user)
    const notification = await prisma.notification.create({
      data: {
        content: '🎉 Test notification: Your notification system is working!',
        userId: 4,
        isRead: false
      }
    });

    res.json({
      success: true,
      data: notification
    });
  } catch (error) {
    console.error('Error creating test notification:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating test notification',
      error: error.message
    });
  }
});

module.exports = router;

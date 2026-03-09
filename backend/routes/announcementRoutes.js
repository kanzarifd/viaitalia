const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createAnnouncement,
  getAllAnnouncements,
  getActiveAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
  deleteAnnouncement,
  toggleAnnouncementStatus
} = require("../controllers/announcementController");

// Apply auth middleware to all routes
router.use(authMiddleware);

// Create announcement (Admin only)
router.post("/", createAnnouncement);

// Get all announcements (Admin only - includes inactive)
router.get("/admin", getAllAnnouncements);

// Get active announcements (Public - for users)
router.get("/active", getActiveAnnouncements);

// Get announcement by ID
router.get("/:id", getAnnouncementById);

// Update announcement (Admin only)
router.put("/:id", updateAnnouncement);

// Delete announcement (Admin only)
router.delete("/:id", deleteAnnouncement);

// Toggle announcement active status (Admin only)
router.patch("/:id/toggle", toggleAnnouncementStatus);

module.exports = router;

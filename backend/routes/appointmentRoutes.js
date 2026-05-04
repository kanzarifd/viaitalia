const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  getAppointmentsByUserId,
  updateAppointment,
  deleteAppointment,
  // Time slot functions
  createTimeSlot,
  getAvailableSlots,
  deleteTimeSlot,
  getSlotsByDate
} = require("../controllers/appointmentController");

// Apply auth middleware to all routes
router.use(authMiddleware);

// Create appointment
router.post("/", createAppointment);

// Get all appointments
router.get("/", getAllAppointments);

// Get appointment by ID
router.get("/:id", getAppointmentById);

// Get appointments by user ID
router.get("/user/:userId", getAppointmentsByUserId);

// Update appointment
router.put("/:id", updateAppointment);

// Delete appointment
router.delete("/:id", deleteAppointment);

// Time slot management routes
// Get all available time slots
router.get("/slots/available", getAvailableSlots);

// Create new time slot (admin only)
router.post("/slots", createTimeSlot);

// Delete time slot (admin only)
router.delete("/slots/:id", deleteTimeSlot);

// Get time slots by date
router.get("/slots/date/:date", getSlotsByDate);

module.exports = router;

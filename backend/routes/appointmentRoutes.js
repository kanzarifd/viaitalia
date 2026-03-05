const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  getAppointmentsByUserId,
  updateAppointment,
  deleteAppointment
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

module.exports = router;

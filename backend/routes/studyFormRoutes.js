const express = require("express");
const router = express.Router();
const {
  submitStudyForm,
  getAllStudyForms,
  getStudyFormById,
  deleteStudyForm,
  updateStudyForm,
  searchStudyForms
} = require("../controllers/studyFormController");

// Submit Study in Italy Form (public)
router.post("/submit", submitStudyForm);

// Get all Study Forms (admin only)
router.get("/", getAllStudyForms);

// Search Study Forms by name (admin only)
router.get("/search", searchStudyForms);

// Get Study Form by ID (admin only)
router.get("/:id", getStudyFormById);

// Update Study Form (admin only)
router.put("/:id", updateStudyForm);

// Delete Study Form (admin only)
router.delete("/:id", deleteStudyForm);

module.exports = router;

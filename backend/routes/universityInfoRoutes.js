const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createUniversityInfo,
  getAllUniversityInfo,
  getUniversityInfoById,
  getUniversityInfoByUserId,
  updateUniversityInfo,
  deleteUniversityInfo
} = require("../controllers/universityInfoController");

// Apply auth middleware to all routes
router.use(authMiddleware);

// Create university info
router.post("/", createUniversityInfo);

// Get all university info
router.get("/", getAllUniversityInfo);

// Get university info by ID
router.get("/:id", getUniversityInfoById);

// Get university info by user ID
router.get("/user/:userId", getUniversityInfoByUserId);

// Update university info
router.put("/:id", updateUniversityInfo);

// Delete university info
router.delete("/:id", deleteUniversityInfo);

module.exports = router;

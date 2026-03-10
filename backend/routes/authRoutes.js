const express = require("express");
const router = express.Router();
const { register, login, getAllUsers, deleteUser, createUser, searchUsers } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/users", authMiddleware, getAllUsers);
router.delete("/users/:id", authMiddleware, deleteUser);
router.post("/users", authMiddleware, createUser);
router.get("/users/search", authMiddleware, searchUsers);

module.exports = router;
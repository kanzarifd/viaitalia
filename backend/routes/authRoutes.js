const express = require("express");
const router = express.Router();
const { register, login, getAllUsers, deleteUser, createUser, searchUsers, updateUser, changePassword } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/users", authMiddleware, getAllUsers);
router.delete("/users/:id", authMiddleware, deleteUser);
router.post("/users", authMiddleware, createUser);
router.get("/users/search", authMiddleware, searchUsers);
router.put("/update", authMiddleware, updateUser);
router.put("/change-password", authMiddleware, changePassword);

module.exports = router;
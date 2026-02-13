require("dotenv").config();
const express = require("express");
const cors = require("cors");
const prisma = require("./config/prisma"); // Import Prisma
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

// Test Route
app.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users); // returns all users
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.use("/api/auth", authRoutes);
// User-only route
app.get("/api/user/dashboard", authMiddleware(["USER"]), (req, res) => {
  res.json({ message: `Welcome USER ${req.user.userId}!` });
});

// Admin-only route
app.get("/api/admin/dashboard", authMiddleware(["ADMIN"]), (req, res) => {
  res.json({ message: `Welcome ADMIN ${req.user.userId}!` });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const prisma = require("./config/prisma"); // Import Prisma
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const universityInfoRoutes = require("./routes/universityInfoRoutes");
const messageRoutes = require("./routes/messageRoutes");
const emailRoutes = require("./routes/emailRoutes");

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
app.use("/api/appointments", appointmentRoutes);
app.use("/api/university-info", universityInfoRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/email", emailRoutes);

// Simple dashboard routes (no auth for testing)
app.get("/api/user/dashboard", (req, res) => {
  res.json({ message: "Welcome USER!" });
});

app.get("/api/admin/dashboard", (req, res) => {
  res.json({ message: "Welcome ADMIN!" });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

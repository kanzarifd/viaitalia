require("dotenv").config();
const express = require("express");
const cors = require("cors");
const prisma = require("./config/prisma"); // Import Prisma
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const universityInfoRoutes = require("./routes/universityInfoRoutes");
const messageRoutes = require("./routes/messageRoutes");
const emailRoutes = require("./routes/emailRoutes");
const contractRoutes = require("./routes/contractRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const studyFormRoutes = require("./routes/studyFormRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const dossierRoutes = require("./routes/dossierRoutes");
const contactRoutes = require("./routes/contactRoutes");

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
app.use("/api/contracts", contractRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/study-forms", studyFormRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/dossiers", dossierRoutes);
app.use("/api/contact", contactRoutes);

// Simple dashboard routes (no auth for testing)
app.get("/api/user/dashboard", (req, res) => {
  res.json({ message: "Welcome USER!" });
});

app.get("/api/admin/dashboard", (req, res) => {
  res.json({ message: "Welcome ADMIN!" });
});

// Test announcement creation endpoint (no auth for testing)
app.post("/api/test/announcements", async (req, res) => {
  try {
    const { createAnnouncement } = require("./controllers/announcementController");
    await createAnnouncement(req, res);
  } catch (error) {
    console.error('Test announcement error:', error);
    res.status(500).json({ success: false, message: 'Test error', error: error.message });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

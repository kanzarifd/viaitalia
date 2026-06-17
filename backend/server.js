require("dotenv").config();

const express = require("express");

const cors = require("cors");

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



const app = express();

// Middleware for handling file uploads
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health-check route (no sensitive data exposed)

app.get("/", (req, res) => {

  res.json({ status: "ok", service: "ViaItalia API" });

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



const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});


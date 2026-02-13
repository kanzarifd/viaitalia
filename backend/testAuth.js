require("dotenv").config();
const prisma = require("./config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function testAuth() {
  try {
    // 1️⃣ Register a new user
    const email = "fadi@example.com";
    const password = "123456";

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.log("User already exists, skipping registration.");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          firstName: "Fadi",
          lastName: "Kanzari",
          email,
          password: hashedPassword,
          role: "USER",
        },
      });
      console.log("User registered:", user);
    }

    // 2️⃣ Login
    const user = await prisma.user.findUnique({ where: { email } });
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Login failed: wrong password");
      return;
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("Login successful!");
    console.log("JWT Token:", token);
    console.log("User ID:", user.id, "Role:", user.role);

  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

testAuth();

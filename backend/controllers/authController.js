const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: { firstName, lastName, email, password: hashedPassword, role },
    });

    res.status(201).json({ message: "User created successfully", userId: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    // Create JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, userId: user.id, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };

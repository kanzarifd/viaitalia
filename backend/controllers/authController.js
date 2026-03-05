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

    // Return user data without password
    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      passport: user.passport,
      studyType: user.studyType,
      university: user.university,
      createdAt: user.createdAt
    };

    res.status(201).json({ 
      message: "User created successfully", 
      user: userData,
      userId: user.id 
    });
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

    // Return user data without password
    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      passport: user.passport,
      studyType: user.studyType,
      university: user.university,
      createdAt: user.createdAt
    };

    res.json({ 
      token, 
      user: userData,
      userId: user.id, 
      role: user.role 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des utilisateurs',
      error: error.message
    });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        appointments: true,
        dossiers: true,
        payments: true,
        messages: true,
        notifications: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    // Log what will be deleted
    console.log(`Deleting user ${user.id} and related records:`, {
      appointments: user.appointments.length,
      dossiers: user.dossiers.length,
      payments: user.payments.length,
      messages: user.messages.length,
      notifications: user.notifications.length
    });

    // Delete user (cascade will handle related records)
    await prisma.user.delete({
      where: { id: parseInt(id) }
    });

    res.status(200).json({
      success: true,
      message: 'Utilisateur et toutes ses données supprimés avec succès'
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de l\'utilisateur',
      error: error.message
    });
  }
};

module.exports = { register, login, getAllUsers, deleteUser };

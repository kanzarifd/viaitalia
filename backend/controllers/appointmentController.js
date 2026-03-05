const prisma = require("../config/prisma");

// Create appointment
const createAppointment = async (req, res) => {
  try {
    console.log('=== CREATE APPOINTMENT DEBUG ===');
    console.log('Request body:', req.body);
    
    const { type, date, status, etat, userId } = req.body;
    
    // Validate required fields
    if (!type || !date || !userId) {
      console.log('Missing required fields:', { type, date, userId });
      return res.status(400).json({
        success: false,
        message: 'Champs requis manquants: type, date, userId',
        error: 'Validation failed'
      });
    }

    // Validate userId is a number
    const parsedUserId = parseInt(userId);
    if (isNaN(parsedUserId)) {
      console.log('Invalid userId format:', userId);
      return res.status(400).json({
        success: false,
        message: 'ID utilisateur invalide',
        error: 'Invalid userId format'
      });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: parsedUserId },
      select: { id: true, firstName: true, lastName: true, email: true }
    });

    if (!existingUser) {
      console.log('User not found with ID:', parsedUserId);
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé',
        error: 'User does not exist'
      });
    }

    console.log('Found user:', existingUser);

    const appointmentData = {
      type,
      date: new Date(date),
      status: status || 'PENDING',
      etat: etat || 'PRESENTIEL',
      userId: parsedUserId
    };
    
    console.log('Appointment data to create:', appointmentData);

    const appointment = await prisma.appointment.create({
      data: appointmentData,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    console.log('Appointment created successfully:', appointment);

    res.status(201).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('=== CREATE APPOINTMENT ERROR ===');
    console.error('Error details:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du rendez-vous',
      error: error.message
    });
  }
};

// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: {
        date: 'asc'
      }
    });

    res.status(200).json({
      success: true,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des rendez-vous',
      error: error.message
    });
  }
};

// Get appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await prisma.appointment.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Rendez-vous non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du rendez-vous',
      error: error.message
    });
  }
};

// Get appointments by user ID
const getAppointmentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: parseInt(userId)
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: {
        date: 'asc'
      }
    });

    res.status(200).json({
      success: true,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des rendez-vous de l\'utilisateur',
      error: error.message
    });
  }
};

// Update appointment
const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, date, status, etat } = req.body;

    const appointment = await prisma.appointment.update({
      where: {
        id: parseInt(id)
      },
      data: {
        type,
        date: date ? new Date(date) : undefined,
        status,
        etat
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du rendez-vous',
      error: error.message
    });
  }
};

// Delete appointment
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.appointment.delete({
      where: {
        id: parseInt(id)
      }
    });

    res.status(200).json({
      success: true,
      message: 'Rendez-vous supprimé avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du rendez-vous',
      error: error.message
    });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  getAppointmentsByUserId,
  updateAppointment,
  deleteAppointment
};

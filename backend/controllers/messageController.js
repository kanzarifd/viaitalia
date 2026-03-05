const prisma = require("../config/prisma");
const emailService = require("../services/emailService");

// Create message
const createMessage = async (req, res) => {
  try {
    console.log('=== CREATE MESSAGE DEBUG ===');
    console.log('Request body:', req.body);
    
    const { content, sender, userId } = req.body;
    
    // Validate required fields
    if (!content || !sender || !userId) {
      console.log('Missing required fields:', { content, sender, userId });
      return res.status(400).json({
        success: false,
        message: 'Champs requis manquants: content, sender, userId',
        error: 'Validation failed'
      });
    }

    // Validate sender is either USER or ADMIN
    if (!['USER', 'ADMIN'].includes(sender)) {
      console.log('Invalid sender:', sender);
      return res.status(400).json({
        success: false,
        message: 'Sender doit être USER ou ADMIN',
        error: 'Invalid sender'
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

    const messageData = {
      content,
      sender,
      userId: parsedUserId
    };
    
    console.log('Message data to create:', messageData);

    const message = await prisma.message.create({
      data: messageData,
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

    console.log('Message created successfully:', message);

    // Send email notification if admin sent the message
    if (sender === 'ADMIN') {
      console.log('Admin sent message, sending email notification...');
      
      try {
        const emailResult = await emailService.sendMessageNotification(
          message.user.email,
          `${message.user.firstName} ${message.user.lastName}`,
          'Équipe Via Italia',
          content
        );
        
        if (emailResult.success) {
          console.log('Email notification sent successfully:', emailResult.messageId);
        } else {
          console.error('Failed to send email notification:', emailResult.error);
        }
      } catch (emailError) {
        console.error('Email notification error:', emailError);
        // Don't fail the message creation if email fails
      }
    }

    res.status(201).json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error('=== CREATE MESSAGE ERROR ===');
    console.error('Error details:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du message',
      error: error.message
    });
  }
};

// Get all messages
const getAllMessages = async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
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
        createdAt: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des messages',
      error: error.message
    });
  }
};

// Get message by ID
const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await prisma.message.findUnique({
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

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message non trouvé'
      });
    }

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du message',
      error: error.message
    });
  }
};

// Get messages by user ID
const getMessagesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await prisma.message.findMany({
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
        createdAt: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des messages',
      error: error.message
    });
  }
};

// Get messages by sender
const getMessagesBySender = async (req, res) => {
  try {
    const { sender } = req.params;

    const messages = await prisma.message.findMany({
      where: {
        sender: sender
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
        createdAt: 'desc'
      }
    });

    res.status(200).json({
      success: true,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des messages',
      error: error.message
    });
  }
};

// Update message
const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, sender } = req.body;

    const messageData = {};
    if (content !== undefined) messageData.content = content;
    if (sender !== undefined) {
      if (!['USER', 'ADMIN'].includes(sender)) {
        return res.status(400).json({
          success: false,
          message: 'Sender doit être USER ou ADMIN',
          error: 'Invalid sender'
        });
      }
      messageData.sender = sender;
    }

    const message = await prisma.message.update({
      where: {
        id: parseInt(id)
      },
      data: messageData,
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
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du message',
      error: error.message
    });
  }
};

// Delete message
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.message.delete({
      where: {
        id: parseInt(id)
      }
    });

    res.status(200).json({
      success: true,
      message: 'Message supprimé avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du message',
      error: error.message
    });
  }
};

module.exports = {
  createMessage,
  getAllMessages,
  getMessageById,
  getMessagesByUserId,
  getMessagesBySender,
  updateMessage,
  deleteMessage
};

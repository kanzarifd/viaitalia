const nodemailer = require('nodemailer');

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const emailService = {
  // Send notification email for new message
  sendMessageNotification: async (userEmail, userName, adminName, messageContent) => {
    try {
      console.log('=== SENDING MESSAGE NOTIFICATION EMAIL ===');
      console.log('To:', userEmail);
      console.log('User:', userName);
      console.log('Admin:', adminName);
      console.log('Message preview:', messageContent.substring(0, 50) + '...');

      const mailOptions = {
        from: process.env.EMAIL_USER || '"Via Italia" <noreply@viaitalia.fr>',
        to: userEmail,
        subject: '📬 Nouveau message de Via Italia',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nouveau message - Via Italia</title>
            <style>
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background-color: #f5f5f5;
                margin: 0;
                padding: 20px;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
                border-radius: 15px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
              }
              .header {
                background: linear-gradient(135deg, #00ff33 0%, #ef4444 100%);
                padding: 30px;
                text-align: center;
                color: white;
              }
              .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: 700;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
              }
              .header p {
                margin: 10px 0 0 0;
                font-size: 16px;
                opacity: 0.9;
              }
              .content {
                padding: 40px 30px;
              }
              .message-preview {
                background: #f8f9fa;
                border-left: 4px solid #00ff33;
                padding: 20px;
                margin: 25px 0;
                border-radius: 8px;
                font-style: italic;
                color: #666;
              }
              .message-preview strong {
                color: #333;
                font-style: normal;
              }
              .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #00ff33 0%, #00cc29 100%);
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 25px;
                font-weight: 600;
                margin: 20px 0;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
              }
              .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 255, 51, 0.3);
              }
              .footer {
                background: #f8f9fa;
                padding: 30px;
                text-align: center;
                border-top: 1px solid #e9ecef;
              }
              .footer p {
                margin: 5px 0;
                color: #666;
                font-size: 14px;
              }
              .contact-info {
                background: linear-gradient(135deg, rgba(0, 255, 51, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%);
                padding: 20px;
                margin: 25px 0;
                border-radius: 8px;
                border: 1px solid rgba(0, 255, 51, 0.2);
              }
              .contact-info h3 {
                color: #00ff33;
                margin: 0 0 15px 0;
                font-size: 18px;
              }
              .contact-info p {
                margin: 8px 0;
                color: #666;
              }
              @media (max-width: 600px) {
                .container {
                  margin: 10px;
                  border-radius: 10px;
                }
                .header {
                  padding: 20px;
                }
                .header h1 {
                  font-size: 24px;
                }
                .content {
                  padding: 30px 20px;
                }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📬 Nouveau Message Reçu</h1>
                <p>Via Italia - Service d'Orientation Universitaire</p>
              </div>
              
              <div class="content">
                <p>Bonjour <strong>${userName}</strong>,</p>
                
                <p>Vous avez reçu un nouveau message de la part de <strong>${adminName}</strong> de l'équipe Via Italia.</p>
                
                <div class="message-preview">
                  <strong>Message :</strong><br>
                  "${messageContent}"
                </div>
                
                <p>Connectez-vous à votre espace personnel pour répondre à ce message et continuer la conversation.</p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://viaitalia.fr/login" class="cta-button">
                    🚀 Accéder à mon espace
                  </a>
                </div>
                
                <div class="contact-info">
                  <h3>📞 Besoin d'aide ?</h3>
                  <p><strong>Email :</strong> contact@viaitalia.fr</p>
                  <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
                  <p><strong>Heures d'ouverture :</strong> Lun-Ven: 9h-18h, Sam: 10h-16h</p>
                </div>
                
                <p>Nous sommes là pour vous accompagner dans votre projet d'études en Italie !</p>
                
                <p>Cordialement,<br>
                <strong>L'équipe Via Italia</strong></p>
              </div>
              
              <div class="footer">
                <p>© 2024 Via Italia - Tous droits réservés</p>
                <p>Service d'orientation universitaire pour les études en Italie</p>
                <p style="font-size: 12px; color: #999;">
                  Si vous ne souhaitez plus recevoir ces notifications, 
                  <a href="https://viaitalia.fr/unsubscribe" style="color: #999;">cliquez ici</a>
                </p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      const result = await transporter.sendMail(mailOptions);
      console.log('Message notification email sent successfully:', result.messageId);
      
      return {
        success: true,
        messageId: result.messageId
      };
    } catch (error) {
      console.error('=== EMAIL NOTIFICATION ERROR ===');
      console.error('Error details:', error);
      console.error('Error message:', error.message);
      
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Test email configuration
  testEmailConfig: async () => {
    try {
      await transporter.verify();
      console.log('Email service is ready');
      return { success: true };
    } catch (error) {
      console.error('Email service configuration error:', error);
      return { success: false, error: error.message };
    }
  }
};

module.exports = emailService;

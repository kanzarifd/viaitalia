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

  // Send notification email for contract status update
  sendContractStatusUpdateEmail: async (userEmail, userName, contractFileName, newStatus, adminName) => {
    try {
      console.log('=== SENDING CONTRACT STATUS UPDATE EMAIL ===');
      console.log('To:', userEmail);
      console.log('User:', userName);
      console.log('Contract:', contractFileName);
      console.log('New Status:', newStatus);
      console.log('Admin:', adminName);

      const getStatusText = (status) => {
        switch (status) {
          case 'PENDING': return '⏳ En Attente';
          case 'UPLOADED': return '📤 Téléversé';
          case 'CONFIRMED': return '✅ Confirmé';
          case 'REJECTED': return '❌ Rejeté';
          default: return status;
        }
      };

      const getStatusColor = (status) => {
        switch (status) {
          case 'PENDING': return '#ffc107';
          case 'UPLOADED': return '#17a2b8';
          case 'CONFIRMED': return '#28a745';
          case 'REJECTED': return '#dc3545';
          default: return '#6c757d';
        }
      };

      const getActionMessage = (status) => {
        switch (status) {
          case 'CONFIRMED':
            return `
              <div style="background-color: #d4edda; border-left: 4px solid #28a745; padding: 20px; margin: 25px 0; border-radius: 8px;">
                <h3 style="color: #155724; margin: 0 0 10px 0;">🎉 Félicitations!</h3>
                <p style="margin: 0; color: #155724;">Votre contrat a été confirmé avec succès. Vous pouvez maintenant procéder aux étapes suivantes de votre inscription.</p>
              </div>
            `;
          case 'REJECTED':
            return `
              <div style="background-color: #f8d7da; border-left: 4px solid #dc3545; padding: 20px; margin: 25px 0; border-radius: 8px;">
                <h3 style="color: #721c24; margin: 0 0 10px 0;">⚠️ Action requise</h3>
                <p style="margin: 0; color: #721c24;">Votre contrat a été rejeté. Veuillez vérifier les informations fournies et soumettre un nouveau contrat si nécessaire.</p>
              </div>
            `;
          case 'PENDING':
            return `
              <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 25px 0; border-radius: 8px;">
                <h3 style="color: #856404; margin: 0 0 10px 0;">⏳ En cours de traitement</h3>
                <p style="margin: 0; color: #856404;">Votre contrat est en attente de validation par notre équipe administrative.</p>
              </div>
            `;
          case 'UPLOADED':
            return `
              <div style="background-color: #d1ecf1; border-left: 4px solid #17a2b8; padding: 20px; margin: 25px 0; border-radius: 8px;">
                <h3 style="color: #0c5460; margin: 0 0 10px 0;">📤 Document reçu</h3>
                <p style="margin: 0; color: #0c5460;">Votre contrat a bien été reçu et est en cours d'examen.</p>
              </div>
            `;
          default:
            return '';
        }
      };

      const mailOptions = {
        from: process.env.EMAIL_USER || '"Via Italia" <noreply@viaitalia.fr>',
        to: userEmail,
        subject: '📄 Mise à jour du statut de votre contrat - Viaitalia',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Mise à jour du contrat - Via Italia</title>
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
              .status-badge {
                display: inline-block;
                padding: 12px 20px;
                border-radius: 25px;
                font-weight: bold;
                text-transform: uppercase;
                font-size: 16px;
                margin: 20px 0;
                background-color: ${getStatusColor(newStatus)};
                color: white;
                text-align: center;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .info-box {
                background-color: #e9ecef;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #007bff;
              }
              .info-box h3 {
                margin: 0 0 15px 0;
                color: #007bff;
                font-size: 18px;
              }
              .info-box ul {
                margin: 0;
                padding-left: 20px;
              }
              .info-box li {
                margin: 8px 0;
                color: #495057;
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
                box-shadow: 0 4px 6px rgba(0, 255, 51, 0.3);
              }
              .cta-button:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 12px rgba(0, 255, 51, 0.4);
              }
              .footer {
                background: #f8f9fa;
                padding: 30px;
                text-align: center;
                border-top: 1px solid #dee2e6;
                color: #6c757d;
                font-size: 14px;
              }
              .footer p {
                margin: 5px 0;
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
                <h1>📄 Mise à jour de Contrat</h1>
                <p>Via Italia - Service d'Orientation Universitaire</p>
              </div>
              
              <div class="content">
                <p>Bonjour <strong>${userName}</strong>,</p>
                
                <p>Nous vous informons que le statut de votre contrat <strong>"${contractFileName}"</strong> a été mis à jour par notre équipe administrative.</p>
                
                <div style="text-align: center; margin: 25px 0;">
                  <div class="status-badge">
                    ${getStatusText(newStatus)}
                  </div>
                </div>
                
                <div class="info-box">
                  <h3>📋 Détails de la mise à jour:</h3>
                  <ul>
                    <li><strong>Nom du fichier:</strong> ${contractFileName}</li>
                    <li><strong>Nouveau statut:</strong> ${getStatusText(newStatus)}</li>
                    <li><strong>Mis à jour par:</strong> ${adminName}</li>
                    <li><strong>Date:</strong> ${new Date().toLocaleDateString('fr-FR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</li>
                  </ul>
                </div>
                
                ${getActionMessage(newStatus)}
                
                <div style="text-align: center;">
                  <a href="https://viaitalia.fr/login" class="cta-button">
                    🚀 Accéder à mon tableau de bord
                  </a>
                </div>
                
                <p>Nous sommes là pour vous accompagner dans votre projet d'études en Italie!</p>
                
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
      console.log('Contract status update email sent successfully:', result.messageId);
      
      return {
        success: true,
        messageId: result.messageId
      };
    } catch (error) {
      console.error('=== CONTRACT STATUS EMAIL ERROR ===');
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

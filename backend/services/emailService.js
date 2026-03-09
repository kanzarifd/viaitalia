const nodemailer = require('nodemailer');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
                background: linear-gradient(135deg, #e74c3c 0%, #27ae60 100%);
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
                background: linear-gradient(135deg, #e74c3c 0%, #27ae60 100%);
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
          case 'PENDING': return '#d68910';
          case 'UPLOADED': return '#1d8348';
          case 'CONFIRMED': return '#229954';
          case 'REJECTED': return '#c0392b';
          default: return '#6c757d';
        }
      };

      const getActionMessage = (status) => {
        switch (status) {
          case 'CONFIRMED':
            return `
              <div style="background-color: #d4edda; border-left: 4px solid #229954; padding: 20px; margin: 25px 0; border-radius: 8px;">
                <h3 style="color: #155724; margin: 0 0 10px 0;">🎉 Félicitations!</h3>
                <p style="margin: 0; color: #155724;">Votre contrat a été confirmé avec succès. Vous pouvez maintenant procéder aux étapes suivantes de votre inscription.</p>
              </div>
            `;
          case 'REJECTED':
            return `
              <div style="background-color: #f8d7da; border-left: 4px solid #c0392b; padding: 20px; margin: 25px 0; border-radius: 8px;">
                <h3 style="color: #721c24; margin: 0 0 10px 0;">⚠️ Action requise</h3>
                <p style="margin: 0; color: #721c24;">Votre contrat a été rejeté. Veuillez vérifier les informations fournies et soumettre un nouveau contrat si nécessaire.</p>
              </div>
            `;
          case 'PENDING':
            return `
              <div style="background-color: #fff3cd; border-left: 4px solid #d68910; padding: 20px; margin: 25px 0; border-radius: 8px;">
                <h3 style="color: #856404; margin: 0 0 10px 0;">⏳ En cours de traitement</h3>
                <p style="margin: 0; color: #856404;">Votre contrat est en attente de validation par notre équipe administrative.</p>
              </div>
            `;
          case 'UPLOADED':
            return `
              <div style="background-color: #d1ecf1; border-left: 4px solid #1d8348; padding: 20px; margin: 25px 0; border-radius: 8px;">
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
                background: linear-gradient(135deg, #e74c3c 0%, #27ae60 100%);
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
                border-left: 4px solid #e74c3c;
              }
              .info-box h3 {
                margin: 0 0 15px 0;
                color: #e74c3c;
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
                background: linear-gradient(135deg, #e74c3c 0%, #27ae60 100%);
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
  },

  // Send announcement notification to all users
  sendAnnouncementNotification: async (announcementTitle, announcementContent, announcementType, announcementLink) => {
    try {
      console.log('=== SENDING ANNOUNCEMENT EMAIL NOTIFICATION ===');
      
      // Get users directly from database (USER role only)
      const users = await prisma.user.findMany({
        where: {
          email: {
            not: ''
          },
          role: 'USER'
        }
      });
      
      console.log('=== FOUND USERS FOR ANNOUNCEMENT ===', users.length);
      
      // Prepare email content for announcement
      const emailContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nouvelle Annonce - Via Italia</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; line-height: 1.6;">
          
          <div style="max-width: 600px; margin: 20px auto; background: linear-gradient(135deg, #e74c3c 0%, #27ae60 100%); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background: rgba(255,255,255,0.1); padding: 30px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.2);">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                📢 Via Italia
              </h1>
              <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px; font-weight: 300;">
                Communication Officielle
              </p>
            </div>
            
            <!-- Content -->
            <div style="background: #ffffff; padding: 40px 30px;">
              
              <!-- Announcement Title -->
              <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="margin: 0; color: #2c3e50; font-size: 24px; font-weight: 600; padding-bottom: 15px; border-bottom: 3px solid #e74c3c; display: inline-block;">
                  ${announcementTitle}
                </h2>
              </div>
              
              <!-- Announcement Content -->
              <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #e74c3c;">
                <p style="margin: 0; color: #34495e; font-size: 16px; line-height: 1.7;">
                  ${announcementContent}
                </p>
              </div>
              
              <!-- Announcement Type Badge -->
              <div style="text-align: center; margin: 25px 0;">
                <span style="
                  display: inline-block;
                  padding: 8px 20px;
                  background: ${announcementType === 'URGENT' ? '#c0392b' : announcementType === 'WARNING' ? '#d68910' : announcementType === 'SUCCESS' ? '#229954' : '#1d8348'};
                  color: white;
                  border-radius: 25px;
                  font-size: 14px;
                  font-weight: 600;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                ">
                  ${announcementType}
                </span>
              </div>
              
              <!-- Announcement Link -->
              ${announcementLink ? `
              <div style="text-align: center; margin: 30px 0;">
                <a href="${announcementLink}" style="
                  display: inline-block;
                  padding: 15px 35px;
                  background: linear-gradient(135deg, #e74c3c 0%, #27ae60 100%);
                  color: white;
                  text-decoration: none;
                  border-radius: 8px;
                  font-weight: 600;
                  font-size: 16px;
                  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.4);
                  transition: all 0.3s ease;
                ">
                  📋 Voir l'annonce complète
                </a>
              </div>
              ` : ''}
              
            </div>
            
            <!-- Footer -->
            <div style="background: #2c3e50; padding: 30px; text-align: center;">
              <div style="margin-bottom: 20px;">
                <h3 style="margin: 0 0 10px 0; color: #ecf0f1; font-size: 18px; font-weight: 600;">
                  L'Équipe Via Italia
                </h3>
                <p style="margin: 5px 0; color: #bdc3c7; font-size: 14px;">
                  Service d'information et de communication
                </p>
              </div>
              
              <div style="border-top: 1px solid #34495e; padding-top: 20px; margin-top: 20px;">
                <p style="margin: 0; color: #95a5a6; font-size: 12px;">
                  © ${new Date().getFullYear()} Via Italia. Tous droits réservés.
                </p>
                <p style="margin: 5px 0 0 0; color: #95a5a6; font-size: 12px;">
                  Cet email a été envoyé automatiquement. Merci de ne pas répondre.
                </p>
              </div>
            </div>
            
          </div>
          
        </body>
        </html>
      `;
      
      // Send email to each user
      const emailPromises = users.map(async (user) => {
        try {
          console.log('=== SENDING ANNOUNCEMENT EMAIL TO USER ===', user.email);
          
          const mailOptions = {
            from: process.env.EMAIL_USER || '"Via Italia" <noreply@viaitalia.fr>',
            to: user.email,
            subject: '📢 Nouvelle Annonce: ' + announcementTitle,
            html: emailContent
          };
          
          await transporter.sendMail(mailOptions);
          
          console.log('=== EMAIL SENT TO USER ===', user.email);
          return {
            success: true,
            message: `Email sent to ${user.email}`,
            userId: user.id
          };
        } catch (error) {
          console.error('=== ERROR SENDING EMAIL TO USER ===', user.email, error);
          return {
            success: false,
            error: error.message,
            userId: user.id
          };
        }
      });
      
      // Wait for all emails to be sent
      const results = await Promise.all(emailPromises);
      const successfulEmails = results.filter(r => r.success);
      const failedEmails = results.filter(r => !r.success);
      
      console.log('=== ANNOUNCEMENT EMAIL RESULTS ===', {
        total: users.length,
        successful: successfulEmails.length,
        failed: failedEmails.length
      });
      
      return {
        success: true,
        message: `Announcement notification sent to ${successfulEmails.length} users`,
        results: results
      };
      
    } catch (error) {
      console.error('=== ANNOUNCEMENT EMAIL NOTIFICATION ERROR ===', error);
      throw error;
    }
  },

  // Send appointment status update email
  sendAppointmentStatusUpdateEmail: async (userEmail, userName, appointmentType, appointmentDate, newStatus, newEtat, adminName) => {
    try {
      console.log('=== SENDING APPOINTMENT STATUS UPDATE EMAIL ===');
      console.log('To:', userEmail);
      console.log('User:', userName);
      console.log('Appointment Type:', appointmentType);
      console.log('Appointment Date:', appointmentDate);
      console.log('New Status:', newStatus);
      console.log('New Etat:', newEtat);
      console.log('Admin:', adminName);
      
      const getStatusText = (status) => {
        switch(status) {
          case 'CONFIRMED':
            return '✅ Confirmé';
          case 'CANCELLED':
            return '❌ Annulé';
          case 'PENDING':
            return '⏳ En Attente';
          default:
            return '⏳ En Attente';
        }
      };

      const getEtatText = (etat) => {
        switch(etat) {
          case 'PRESENTIEL':
            return '🏢 Présentiel';
          case 'EN_LIGNE':
            return '💻 En Ligne';
          default:
            return '🏢 Présentiel';
        }
      };

      const getActionMessage = (status) => {
        switch(status) {
          case 'CONFIRMED':
            return `
              <div class="info-box">
                <h3>🎉 Votre rendez-vous est confirmé!</h3>
                <p>Nous sommes ravis de vous confirmer votre rendez-vous. Veuillez vous présenter à l'heure et au lieu prévus.</p>
              </div>
            `;
          case 'CANCELLED':
            return `
              <div class="info-box">
                <h3>📝 Votre rendez-vous a été annulé</h3>
                <p>Nous vous informons que votre rendez-vous a été annulé. Si vous avez des questions, n'hésitez pas à nous contacter.</p>
              </div>
            `;
          default:
            return `
              <div class="info-box">
                <h3>📋 Votre rendez-vous est en attente</h3>
                <p>Votre rendez-vous est en attente de confirmation. Nous vous tiendrons informé dès que possible.</p>
              </div>
            `;
        }
      };

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: `📅 Mise à jour de votre rendez-vous - Via Italia`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Mise à jour de Rendez-vous - Via Italia</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f9fa; line-height: 1.6;">
            
            <div style="max-width: 600px; margin: 20px auto; background: linear-gradient(135deg, #e74c3c 0%, #27ae60 100%); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
              
              <!-- Header -->
              <div style="background: rgba(255,255,255,0.1); padding: 30px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.2);">
                <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
                  📅 Via Italia
                </h1>
                <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px; font-weight: 300;">
                  Service de Rendez-vous
                </p>
              </div>
              
              <!-- Content -->
              <div style="background: #ffffff; padding: 40px 30px;">
                
                <!-- Greeting -->
                <p style="margin: 0 0 20px 0; color: #2c3e50; font-size: 16px;">
                  Bonjour <strong>${userName}</strong>,
                </p>
                
                <!-- Main Message -->
                <p style="margin: 0 0 20px 0; color: #34495e; font-size: 16px;">
                  Nous vous informons que le statut de votre rendez-vous <strong>${appointmentType}</strong> a été mis à jour par notre équipe administrative.
                </p>
                
                <!-- Status Badge -->
                <div style="text-align: center; margin: 25px 0;">
                  <div style="
                    display: inline-block;
                    padding: 12px 24px;
                    background: ${newStatus === 'CONFIRMED' ? '#27ae60' : newStatus === 'CANCELLED' ? '#e74c3c' : '#f39c12'};
                    color: white;
                    border-radius: 25px;
                    font-size: 16px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                  ">
                    ${getStatusText(newStatus)}
                  </div>
                </div>
                
                <!-- Etat Badge -->
                <div style="text-align: center; margin: 20px 0;">
                  <div style="
                    display: inline-block;
                    padding: 10px 20px;
                    background: ${newEtat === 'PRESENTIEL' ? '#27ae60' : '#3498db'};
                    color: white;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 500;
                    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
                  ">
                    ${getEtatText(newEtat)}
                  </div>
                </div>
                
                <!-- Appointment Details -->
                <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #e74c3c;">
                  <h3 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 18px;">📋 Détails du rendez-vous:</h3>
                  <ul style="margin: 0; padding: 0; list-style: none; color: #34495e;">
                    <li style="margin-bottom: 10px;"><strong>Type:</strong> ${appointmentType}</li>
                    <li style="margin-bottom: 10px;"><strong>Date:</strong> ${new Date(appointmentDate).toLocaleDateString('fr-FR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric'
                    })}</li>
                    <li style="margin-bottom: 10px;"><strong>Heure:</strong> ${new Date(appointmentDate).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</li>
                    <li style="margin-bottom: 10px;"><strong>Statut:</strong> ${getStatusText(newStatus)}</li>
                    <li style="margin-bottom: 10px;"><strong>Mode:</strong> ${getEtatText(newEtat)}</li>
                    <li style="margin-bottom: 10px;"><strong>Mis à jour par:</strong> ${adminName}</li>
                    <li style="margin-bottom: 0;"><strong>Date de mise à jour:</strong> ${new Date().toLocaleDateString('fr-FR', { 
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
                
                <!-- CTA Button -->
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://viaitalia.fr/login" style="
                    display: inline-block;
                    padding: 15px 35px;
                    background: linear-gradient(135deg, #e74c3c 0%, #27ae60 100%);
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 16px;
                    box-shadow: 0 4px 15px rgba(231, 76, 60, 0.4);
                    transition: all 0.3s ease;
                  ">
                    🚀 Accéder à mon tableau de bord
                  </a>
                </div>
                
                <!-- Footer Message -->
                <p style="margin: 30px 0 0 0; color: #34495e; font-size: 16px;">
                  Nous sommes là pour vous accompagner dans votre projet d'études en Italie!
                </p>
                
                <!-- Signature -->
                <p style="margin: 20px 0 0 0; color: #7f8c8d; font-size: 14px;">
                  Cordialement,<br>
                  L'Équipe Via Italia<br>
                  Service d'Orientation Universitaire
                </p>
              </div>
              
              <!-- Footer -->
              <div style="background: #2c3e50; padding: 30px; text-align: center;">
                <div style="border-top: 1px solid #34495e; padding-top: 20px; margin-top: 20px;">
                  <p style="margin: 0; color: #95a5a6; font-size: 12px;">
                    © ${new Date().getFullYear()} Via Italia. Tous droits réservés.
                  </p>
                  <p style="margin: 5px 0 0 0; color: #95a5a6; font-size: 12px;">
                    Cet email a été envoyé automatiquement. Merci de ne pas répondre.
                  </p>
                </div>
              </div>
              
            </div>
            
          </body>
          </html>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log('✅ Appointment status update email sent successfully to:', userEmail);
      return { success: true };
    } catch (error) {
      console.error('❌ Error sending appointment status update email:', error);
      return { success: false, error: error.message };
    }
  },

  // Test email sending function
  testAnnouncementEmail: async () => {
    console.log('=== TESTING EMAIL SERVICE ===');
    
    try {
      // Test the email service directly
      const testResult = await emailService.sendAnnouncementNotification(
        'Test Announcement',
        'This is a test announcement content',
        'INFO',
        'https://example.com'
      );
      
      console.log('=== TEST EMAIL SERVICE RESULT ===', testResult);
      
      return testResult;
      
    } catch (error) {
      console.error('=== TEST EMAIL SERVICE ERROR ===', error);
      return { success: false, error: error.message };
    }
  },

  // Test nodemailer directly
  testNodemailer: async () => {
    console.log('=== TESTING NODEMAILER ===');
    
    try {
      // Create test email content
      const testEmailContent = `
        <h2>Test Email from Nodemailer</h2>
        <p>This is a test email to verify nodemailer is working correctly.</p>
      `;
      
      // Create test mail options
      const testMailOptions = {
        from: process.env.EMAIL_USER || '"Via Italia" <noreply@viaitalia.fr>',
        to: 'fedy22ka@gmail.com',
        subject: '📧 Test Email from Via Italia',
        html: testEmailContent
      };
      
      // Send test email
      const info = await transporter.sendMail(testMailOptions);
      console.log('=== NODEMAILER TEST RESULT ===', info);
      
      return info;
      
    } catch (error) {
      console.error('=== NODEMAILER TEST ERROR ===', error);
      return { success: false, error: error.message };
    }
  }
};

module.exports = emailService;

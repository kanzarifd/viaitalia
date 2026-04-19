// Test script for contact email functionality
require('dotenv').config();

const { sendEmailNotification } = require('./controllers/contactController');

const testContactData = {
  fullName: 'Test User',
  email: 'test@example.com',
  phone: '+216 22 552 722',
  message: 'Ceci est un message de test pour vérifier que les notifications par email fonctionnent correctement.',
  createdAt: new Date()
};

console.log('Testing contact email notification...');
console.log('Make sure you have configured your .env file with:');
console.log('- EMAIL_USER (your Gmail address)');
console.log('- EMAIL_PASS (your Gmail app password)');
console.log('');

sendEmailNotification(testContactData)
  .then(() => {
    console.log('✅ Email sent successfully!');
    console.log('Check your inbox at viaitaliaagency@gmail.com');
  })
  .catch((error) => {
    console.error('❌ Error sending email:', error.message);
    console.log('');
    console.log('Troubleshooting:');
    console.log('1. Make sure you have a Gmail App Password (not your regular password)');
    console.log('2. Enable 2-factor authentication on your Gmail account');
    console.log('3. Create an App Password at: https://myaccount.google.com/apppasswords');
    console.log('4. Update your .env file with the correct credentials');
  });

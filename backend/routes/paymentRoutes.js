const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Create a new payment
router.post('/', paymentController.createPayment);

// Get all payments
router.get('/', paymentController.getAllPayments);

// Get payment statistics
router.get('/stats', paymentController.getPaymentStats);

// Get payment by ID
router.get('/:id', paymentController.getPaymentById);

// Update payment
router.put('/:id', paymentController.updatePayment);

// Add partial payment
router.post('/:id/add-payment', paymentController.addPayment);

// Delete payment
router.delete('/:id', paymentController.deletePayment);

// Get payments by user ID
router.get('/users/:userId/payments', paymentController.getPaymentsByUserId);

module.exports = router;

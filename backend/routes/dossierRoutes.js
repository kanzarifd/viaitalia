const express = require('express');
const router = express.Router();
const dossierController = require('../controllers/dossierController');

// Create a new dossier
router.post('/', dossierController.createDossier);

// Create missing dossiers for existing users (admin only)
router.post('/create-missing', dossierController.createMissingDossiers);

// Get all dossiers
router.get('/', dossierController.getAllDossiers);

// Get dossier statistics
router.get('/stats', dossierController.getDossierStats);

// Get dossier by ID
router.get('/:id', dossierController.getDossierById);

// Update dossier
router.put('/:id', dossierController.updateDossier);

// Delete dossier
router.delete('/:id', dossierController.deleteDossier);

// Get dossiers by user ID
router.get('/users/:userId/dossiers', dossierController.getDossiersByUserId);

// Get single dossier by user ID
router.get('/user/:userId', dossierController.getDossierByUserId);

module.exports = router;

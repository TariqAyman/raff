// auth.routes.js
const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');

const router = Router();

// Unprotected login endpoint
router.post('/login', AuthController.login);

router.get('/health', (req, res) => res.json({ status: 'OK' }));

module.exports = router;

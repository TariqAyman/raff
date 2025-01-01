const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');
const PaymentController = require('../controllers/payment.controller');
const WebhookService = require('../services/webhook.service');
const DataController = require('../controllers/data.controller');
const { requirePermission } = require('../middlewares/role.middleware');
const { cacheGet } = require('../middlewares/cache.middleware');

const router = Router();

// Payment endpoints
router.post('/payments', requirePermission('PAYMENT_CREATE'), PaymentController.processPayment);
router.post('/webhook', WebhookService.receiveWebhook);

// Data endpoints
router.post('/upload-csv', requirePermission('DATA_UPLOAD'), DataController.uploadCSV);
router.get('/aggregates', requirePermission('DATA_READ'), DataController.getAggregates);

module.exports = router;


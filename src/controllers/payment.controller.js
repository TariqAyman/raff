const PaymentService = require('../services/payment.service');

exports.processPayment = async (req, res, next) => {
    try {
        const { amount } = req.body;
        if (!amount) {
            return res.status(400).json({ error: 'Missing amount' });
        }

        const userId = req.user._id;

        const result = await PaymentService.processPayment(userId, amount);
        return res.json({ success: result.status, transactionId: result.txId });
    } catch (error) {
        next(error);
    }
};

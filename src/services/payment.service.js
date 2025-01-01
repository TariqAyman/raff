const Payment = require('../models/payment.model');
const { v4: uuidv4 } = require('uuid');

exports.processPayment = async (userId, amount) => {
    try {
        const externalTxId = uuidv4();

        // Create a pending payment record
        const paymentRecord = await Payment.create({
            user: userId,
            gatewayTxId: externalTxId,
            amount,
            status: 'PENDING'
        });

        // Simulate external payment gateway
        const success = Math.random() >= 0.1; // 90% success
        if (!success) {
            // Mark as FAILED in DB
            paymentRecord.status = 'FAILED';
            console.error('Payment gateway failed', paymentRecord.gatewayTxId);
        } else {
            // Mark as COMPLETED
            paymentRecord.status = 'COMPLETED';
        }
        
        await paymentRecord.save();

        return { txId: externalTxId, status: success };
    } catch (err) {
        console.error('[PaymentService] Error:', err.message);
        throw err;
    }
};

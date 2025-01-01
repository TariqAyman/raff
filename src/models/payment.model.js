const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        gatewayTxId: {
            type: String,
            unique: true,
            required: true
        },
        amount: {
            type: Number,
            required: true,
            index: true
        },
        status: {
            type: String,
            enum: ['PENDING', 'COMPLETED', 'FAILED'],
            default: 'PENDING',
            index: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Payment', paymentSchema);

const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('paymentProcessed', (data) => {
    console.log('Payment processed:', data);
    // Here you can add logic to send notifications
});

function notifyPaymentProcessed(data) {
    eventEmitter.emit('paymentProcessed', data);
}

module.exports = { notifyPaymentProcessed }; 
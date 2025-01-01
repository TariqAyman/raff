const { notifyPaymentProcessed } = require('../src/services/notification.service');

describe('Notification Service Tests', () => {
    it('should emit payment processed event', (done) => {
        const data = { txId: '12345', status: 'COMPLETED' };

        // Listen for the event
        const EventEmitter = require('events');
        const emitter = new EventEmitter();
        emitter.on('paymentProcessed', (eventData) => {
            expect(eventData).toEqual(data);
            done();
        });

        // Replace the event emitter in the service with our test emitter
        const originalEmitter = require('../src/services/notification.service').eventEmitter;
        require('../src/services/notification.service').eventEmitter = emitter;

        notifyPaymentProcessed(data);

        // Restore the original emitter
        require('../src/services/notification.service').eventEmitter = originalEmitter;
    }, 10000);
}); 
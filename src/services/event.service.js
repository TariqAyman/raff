const amqp = require('amqplib');

let channel;

exports.initEventService = async () => {
    try {
        const conn = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
        channel = await conn.createChannel();
        await channel.assertQueue('notifications', { durable: true });
        console.log('[EventService] RabbitMQ connected and queue asserted');
    } catch (err) {
        console.error('[EventService] Failed to initialize RabbitMQ:', err);
    }
};

exports.publishNotification = async (message) => {
    if (!channel) {
        throw new Error('RabbitMQ channel is not initialized');
    }
    channel.sendToQueue(
        'notifications',
        Buffer.from(JSON.stringify(message)),
        { persistent: true }
    );
};

const amqp = require('amqplib');

async function startConsuming() {
    const conn = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    const channel = await conn.createChannel();
    await channel.assertQueue('notifications', { durable: true });

    channel.consume('notifications', (msg) => {
        if (msg !== null) {
            const notification = JSON.parse(msg.content.toString());
            console.log('Received notification:', notification);
            channel.ack(msg);
        }
    });
}

startConsuming();

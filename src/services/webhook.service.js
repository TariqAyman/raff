let processedEvents = new Set();

exports.receiveWebhook = async (req, res) => {
    const { eventId, data } = req.body;
    if (!eventId) {
        return res.status(400).json({ error: 'Missing eventId' });
    }

    if (processedEvents.has(eventId)) {
        return res.status(200).json({ message: 'Already processed' });
    }

    processedEvents.add(eventId);

    // Perform business logic with 'data'
    console.log('[Webhook] Received data:', data);

    return res.json({ success: true });
};

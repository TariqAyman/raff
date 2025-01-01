const { updateAggregation } = require('./aggregator');

const queue = [];
let isProcessing = false;

function processNextItem() {
    if (queue.length === 0) {
        isProcessing = false;
        return;
    }
    isProcessing = true;

    const row = queue.shift();
    try {
        // Simulate processing
        // For partial failures, we could wrap in try/catch 
        // and push the item to a DLQ if it fails repeatedly
        console.log('Processing row:', row);
        updateAggregation(row);
    } catch (err) {
        console.error('[DataEngine] Failed row:', err.message);
    }

    setImmediate(() => processNextItem());
}

exports.pushToQueue = (row) => {
    queue.push(row);
    if (!isProcessing) {
        processNextItem();
    }
};

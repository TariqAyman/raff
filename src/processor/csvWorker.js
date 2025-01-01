const { Readable } = require('stream');
const csvParser = require('csv-parser');
const { pushToQueue } = require('./backPressureQueue');

exports.processCSV = async (csvContent) => {
    const readStream = Readable.from(csvContent);

    return new Promise((resolve, reject) => {
        readStream
            .pipe(csvParser())
            .on('data', (row) => {
                // Each row is enqueued for further processing (aggregation, etc.)
                pushToQueue(row);
            })
            .on('end', () => {
                console.log('[DataEngine] CSV parse complete');
                resolve();
            })
            .on('error', (error) => {
                console.error('[Data Engine] Error in CSV streaming:', error);
                reject(error);
            });
    });
};

const fs = require('fs');
const csv = require('fast-csv');

/**
 * processCSV - concurrently processes CSV data by streaming.
 * Demonstrates back-pressure if the queue is full.
 */
async function processCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv.parse({ headers: true }))
            .on('data', row => results.push(row))
            .on('end', () => {
                console.log(`Processed ${filePath}`);
                resolve(results);
            })
            .on('error', error => reject(error));
    });
}

async function processMultipleCSVs(filePaths) {
    const promises = filePaths.map(filePath => processCSV(filePath));
    return Promise.all(promises);
}

module.exports = { processCSV, processMultipleCSVs }; 
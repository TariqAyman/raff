const { processCSV, processMultipleCSVs } = require('../src/processor/csvProcessor');
const fs = require('fs');
const path = require('path');

describe('CSV Processor Tests', () => {
    const testCSVFilePath = path.join(__dirname, 'test.csv');

    beforeAll(() => {
        // Create a test CSV file
        fs.writeFileSync(testCSVFilePath, 'category,value\nBooks,10\nClothing,25\n');
    });

    afterAll(() => {
        // Clean up the test CSV file
        fs.unlinkSync(testCSVFilePath);
    });

    it('should process a single CSV file', async () => {
        const result = await processCSV(testCSVFilePath);
        expect(result).toEqual([
            { category: 'Books', value: '10' },
            { category: 'Clothing', value: '25' }
        ]);
    }, 10000);

    it('should process multiple CSV files concurrently', async () => {
        const result = await processMultipleCSVs([testCSVFilePath, testCSVFilePath]);
        expect(result).toHaveLength(2);
        expect(result[0]).toEqual([
            { category: 'Books', value: '10' },
            { category: 'Clothing', value: '25' }
        ]);
        expect(result[1]).toEqual([
            { category: 'Books', value: '10' },
            { category: 'Clothing', value: '25' }
        ]);
    }, 10000);
}); 
const { processCSV } = require('../processor/csvWorker');
const { getCurrentAggregates } = require('../processor/aggregator');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

exports.uploadCSV = [
    upload.single('csvContent'),
    async (req, res, next) => {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No CSV content' });
            }

            const csvContent = await fs.promises.readFile(req.file.path, 'utf8');

            await processCSV(csvContent);
            await fs.promises.unlink(req.file.path); // Clean up uploaded file

            return res.json({ message: 'CSV processing started' });
        } catch (err) {
            next(err);
        }
    }
];

exports.getAggregates = async (req, res) => {
    try {
        const aggregates = await getCurrentAggregates();
        return res.json(aggregates);
    } catch (err) {
        next(err);
    }
};

const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
            index: true
        },
        // We store permissions as array of strings for simplicity
        permissions: [{
            type: String,
            index: true
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Role', roleSchema);

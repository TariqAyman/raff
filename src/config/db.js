const mongoose = require('mongoose');

const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log('[MongoDB] Connected successfully');
    return connection;
};

module.exports = { connectDB };
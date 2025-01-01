require('dotenv').config();
const { connectDB } = require('../config/db');
const Role = require('../models/role.model');
const User = require('../models/user.model');

async function seed() {
    await connectDB();

    // Clear existing data (for demo purposes)
    await User.deleteMany({});
    await Role.deleteMany({});

    // Create roles with permissions if they don't exist
    const adminRole = await Role.findOne({ name: 'admin' }) || await Role.create({
        name: 'admin',
        permissions: ['PAYMENT_CREATE', 'PAYMENT_READ', 'DATA_UPLOAD', 'DATA_READ']
    });

    const managerRole = await Role.findOne({ name: 'manager' }) || await Role.create({
        name: 'manager',
        permissions: ['PAYMENT_READ', 'DATA_UPLOAD', 'DATA_READ']
    });

    const userRole = await Role.findOne({ name: 'user' }) || await Role.create({
        name: 'user',
        permissions: ['PAYMENT_READ', 'DATA_READ']
    });

    // Create some users if they don't exist
    const adminUser = await User.findOne({ username: 'admin' }) || await User.create({
        username: 'admin',
        password: 'admin',
        roles: [adminRole._id]
    });

    const managerUser = await User.findOne({ username: 'manager' }) || await User.create({
        username: 'manager',
        password: 'manager',
        roles: [managerRole._id]
    });

    const normalUser = await User.findOne({ username: 'user' }) || await User.create({
        username: 'user',
        password: 'user',
        roles: [userRole._id]
    });

    console.log('Seed data created:', {
        adminUser,
        managerUser,
        normalUser
    });
}

seed();

module.exports = seed;
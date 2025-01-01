const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { generateToken } = require('../utils/auth');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required.' });
        }

        // Find user in DB
        const user = await User.findOne({ username }).populate('roles');
        if (!user) {
            return res.status(401).json({ error: 'Invalid username/password.' });
        }

        // Compare hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid username/password' });
        }

        // Generate JWT
        const token = generateToken(user);

        return res.json({ token });
    } catch (error) {
        console.error('[AuthController] Login error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

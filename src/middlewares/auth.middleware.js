const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { verifyToken } = require('../utils/auth');

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = verifyToken(token);

        const user = await User.findById(decoded.userId).populate('roles');

        if (!user) {
            return res.status(403).json({ error: 'Invalid user' });
        }

        req.user = {
            _id: user._id,
            username: user.username,
            roles: user.roles.map((r) => r.name),
            permissions: user.roles.reduce((acc, role) => {
                role.permissions.forEach((p) => acc.add(p));
                return acc;
            }, new Set())
        };
        return next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

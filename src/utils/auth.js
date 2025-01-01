// src/utils/auth.js
const jwt = require('jsonwebtoken');

/**
 * Generates a JWT token for a user.
 * @param {Object} user - The user object containing user information.
 * @param {Object} [options] - Options for the token.
 * @param {number} [options.expiresIn] - Expiration time for the token (in seconds).
 * @returns {string} - The generated JWT token.
 */
const generateToken = (user) => {
    const payload = {
        userId: user._id,
        username: user.username,
        permissions: user.roles.reduce((acc, role) => {
            role.permissions.forEach((p) => acc.add(p));
            return acc;
        }, new Set())
    };

    return jwt.sign(payload, process.env.JWT_SECRET || 'mysecret', { expiresIn: '1h' });
};

/**
 * Verifies a JWT token and returns the decoded payload.
 * @param {string} token - The JWT token to verify.
 * @returns {Object} - The decoded payload if the token is valid.
 * @throws {Error} - Throws an error if the token is invalid or expired.
 */
const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET || 'mysecret'; // Use your secret key
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

module.exports = {
    generateToken,
    verifyToken,
};
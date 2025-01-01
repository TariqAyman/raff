const rateLimit = require('express-rate-limit');

module.exports = () => {
    return rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 120,
        standardHeaders: true,
        legacyHeaders: false
    });
};

// src/middlewares/cache.middleware.js
const { getRedis } = require('../services/redis.service');

exports.cacheGet = (cacheKeyGenerator, ttlSeconds = 60) => {
    return async (req, res, next) => {
        try {
            const redis = getRedis();
            const cacheKey = cacheKeyGenerator(req);

            const cachedVal = await redis.get(cacheKey);
            if (cachedVal) {
                // Return cached response
                return res.status(200).json(JSON.parse(cachedVal));
            }

            // Not in cache -> proceed, but intercept the response
            const originalSend = res.json.bind(res);
            
            res.json = (body) => {
                // Save the response to cache
                redis.set(cacheKey, JSON.stringify(body), 'EX', ttlSeconds);
                return originalSend(body);
            };

            next();
        } catch (err) {
            next(err);
        }
    };
};

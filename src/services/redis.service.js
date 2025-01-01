const Redis = require('ioredis');

let redis;

exports.initRedis = () => {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    // For cluster mode, you'd do something like:
    // redisClient = new Redis.Cluster([{ host: 'host1', port: 6379 }, ...]);
    redisClient = new Redis(redisUrl);
    console.log('[Redis] Client connected to', redisUrl);
};

exports.getRedis = () => redisClient;

const { getRedis } = require('./redis.service');
const Role = require('../models/role.model');

const ROLE_CACHE_PREFIX = 'role-cache:';

exports.getRoleFromCacheOrDB = async (roleName) => {
    const redis = getRedis();
    const cacheKey = `${ROLE_CACHE_PREFIX}${roleName}`;

    // Check in cache
    const cached = await redis.get(cacheKey);
    if (cached) {
        return JSON.parse(cached);
    }

    // Not cached, fetch from DB
    const roleDoc = await Role.findOne({ name: roleName }).lean();
    if (roleDoc) {
        // Store in Redis
        await redis.set(cacheKey, JSON.stringify(roleDoc), 'EX', 86400);
    }
    return roleDoc;
};

// Invalidate the cache if role is updated
exports.invalidateRoleCache = async (roleName) => {
    const redis = getRedis();
    const cacheKey = `${ROLE_CACHE_PREFIX}${roleName}`;
    await redis.del(cacheKey);
};
const { getRedis } = require('../services/redis.service');

const AGG_HASH_KEY = 'csv:aggregator';

exports.updateAggregation = async (row) => {
    const category = row.category || 'UNKNOWN';
    const value = parseFloat(row.value) || 0;

    const redis = getRedis();

    await redis.hincrbyfloat(AGG_HASH_KEY, category, value);
};

exports.getCurrentAggregates = async () => {
    const redis = getRedis();

    const data = await redis.hgetall(AGG_HASH_KEY);

    // Convert string values to numbers
    for (const key of Object.keys(data)) {
        data[key] = parseFloat(data[key]);
    }
    return data;
};
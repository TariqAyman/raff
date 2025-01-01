// src/services/external.service.js
const CircuitBreaker = require('opossum');
const axios = require('axios');

const options = {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 5000,
};

async function externalAPICall() {
    // For demo purposes, call a public API
    return axios.get('https://api.external.api/call');
}

const breaker = new CircuitBreaker(externalAPICall, options);

// Fallback response
breaker.fallback(() => {
    return { data: [], fallback: true };
});

exports.callWithCircuitBreaker = async () => {
    return breaker.fire();
};

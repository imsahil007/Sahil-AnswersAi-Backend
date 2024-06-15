const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests
    message: 'Too many requests from this IP, please try again later.'
});

module.exports = apiLimiter;

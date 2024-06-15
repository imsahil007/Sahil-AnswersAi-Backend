const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
    logger.error('%O', err);
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = errorHandler;

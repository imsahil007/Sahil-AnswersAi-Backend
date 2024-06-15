const jwt = require('jsonwebtoken');
const User = require('../models/User');
const dotenv = require('dotenv');
const logger = require('../config/logger');
dotenv.config();

const authMiddleware = async (req, res, next) => {
    logger.info('Auth middleware');
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        console.log('No token, authorization denied');
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(401).json({ message: 'User not found, authorization denied' });
        }
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;

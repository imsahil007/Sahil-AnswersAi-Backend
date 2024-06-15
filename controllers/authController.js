const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user._id);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

exports.logoutUser = (req, res) => {
    const { token } = req.body;
    try {
        // Remove from cache if storing
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token', error });
    }
};

exports.refreshToken = (req, res) => {
    const { token } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const newToken = generateToken(decoded.id);
        res.status(200).json({ token: newToken });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token', error });
    }
};

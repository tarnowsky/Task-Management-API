const { verify } = require('jsonwebtoken');
const { verifyToken } = require('../config/jwt');
const User = require('../models/User');
const { model } = require('mongoose');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({
            message: 'No token, authorization denied',
        });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({
                message: 'Token is not valid'
            });
        }

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(401).json({
                message: 'User not found',
            });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            message: `Token is not valid:`,
            error: error.message,
        });
    }
}

module.exports = authMiddleware;
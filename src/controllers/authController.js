const User = require('../models/User');
const {registerValidation, loginValidation} = require('../utils/validation');
const {generateToken} = require('../config/jwt');

const registerUser = async (req, res) => {

    const {error} = registerValidation(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    const {username, email, password} = req.body;

    try {
        const existingEmail = await User.findOne({email});
        if (existingEmail) {
            return res.status(400).json({
                message: 'Email already exists',
            });
        }

        const existngUsername = await User.findOne({username});
        if (existngUsername) {
            return res.status(400).json({
                message: 'Username already exists',
            });
        }

        const user = new User({
            username,
            email,
            password
        });

        await User.save(user);
    
        const token = generateToken(user);

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
        });
    }

    const {login, password} = req.body;

    try {
        const user = await User.findOne({
            $or: [
                {username: login},
                {email: login},
            ]
        });

        if (!user) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        const token = generateToken(user);

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message,
        });
    }
};

module.exports = {
    registerUser,
    loginUser
}


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthModel = require('../models/Authmodel');

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret_key';

const authcontroller = {
    login:async (req, res) => {
        try {
            const { email, password } = req.body;
    
            // Check if user exists
            const user = await AuthModel.findOne({ email });
            if (!user) {
                return res.status(400).send({
                    isSuccessfull: false,
                    message: 'User not found'
                });
            }
    
            // Compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).send({
                    isSuccessfull: false,
                    message: 'Invalid credentials'
                });
            }
    
            // Generate JWT token
            const token = jwt.sign(
                { id: user._id, email: user.email },
                JWT_SECRET,
                { expiresIn: '1h' }
            );
    
            res.status(200).send({
                isSuccessfull: true,
                message: 'Login successful',
                token
            });
        } catch (error) {
            res.status(400).send({
                isSuccessfull: false,
                message: error.message
            });
        }
    },
    SignUp:async (req, res) => {
        try {
            const { username, email, password } = req.body;
    
            // Check if user already exists
            const existingUser = await AuthModel.findOne({ email });
            if (existingUser) {
                return res.status(400).send({
                    isSuccessfull: false,
                    message: 'User already exists'
                });
            }
    
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Create new user
            const newUser = new AuthModel({ username, email, password: hashedPassword });
            await newUser.save();
    
            res.status(201).send({
                isSuccessfull: true,
                message: 'User created successfully',
                data: newUser
            });
        } catch (error) {
            res.status(400).send({
                isSuccessfull: false,
                message: error.message
            });
        }
    },
}

module.exports = authcontroller
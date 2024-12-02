const express = require('express');
const User = require('../models/user');
const router = express.Router();

// 注册
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    try {
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 登录
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.json({ message: 'Login successful', user });
    } else {
        res.status(400).json({ error: 'Invalid credentials' });
    }
});

module.exports = router;

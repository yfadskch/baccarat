const express = require('express');
const User = require('../models/user');
const router = express.Router();

// 用户注册
router.post('/register', async (req, res) => {
  const { username, phone } = req.body;
  try {
    const user = await User.create({ username, phone, points: 100 });
    if (!user.welcomeBonusGiven) {
      user.points += user.points * 0.6; // Welcome Bonus
      user.welcomeBonusGiven = true;
    }
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 用户登录
router.post('/login', async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

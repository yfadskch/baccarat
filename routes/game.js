const express = require('express');
const GameResult = require('../models/gameResult');
const User = require('../models/user');
const router = express.Router();

// 保存游戏结果
router.post('/result', async (req, res) => {
  const { userId, result } = req.body;
  try {
    const gameResult = await GameResult.create({ userId, result });
    if (result === 'player') {
      await User.findByIdAndUpdate(userId, { $inc: { points: 10 } });
    }
    res.status(201).json(gameResult);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 积分兑换
router.post('/redeem', async (req, res) => {
  const { userId, pointsToRedeem } = req.body;
  try {
    const user = await User.findById(userId);
    if (user.points < pointsToRedeem) {
      return res.status(400).json({ message: 'Insufficient points' });
    }
    user.points -= pointsToRedeem;
    await user.save();
    res.json({ message: 'Redeemed successfully', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;

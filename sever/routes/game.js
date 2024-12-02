const express = require('express');
const router = express.Router();
const GameResult = require('../models/gameResult');

// 获取所有游戏结果
router.get('/results', async (req, res) => {
    try {
        const results = await GameResult.find().sort({ createdAt: -1 }); // 按时间倒序排序
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch game results' });
    }
});

// 添加新的游戏结果
router.post('/results', async (req, res) => {
    const { userId, result } = req.body;

    try {
        const newResult = new GameResult({ userId, result });
        await newResult.save();
        res.status(201).json(newResult);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save game result' });
    }
});

module.exports = router;

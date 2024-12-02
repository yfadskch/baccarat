const express = require("express");

const router = express.Router();

// Example game logic
router.get("/play", (req, res) => {
    const outcomes = ["player", "banker", "tie"];
    const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
    res.json({ result: randomOutcome });
});

module.exports = router;

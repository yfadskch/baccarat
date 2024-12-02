const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/game');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/baccarat_game', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// 路由
app.use('/auth', authRoutes);
app.use('/game', gameRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

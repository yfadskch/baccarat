const express = require('express');
const mongoose = require('mongoose');
const app = express();
const gameRoutes = require('./routes/game');

mongoose.connect('mongodb://localhost:27017/baccarat_game', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(express.json());
app.use('/api/game', gameRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));

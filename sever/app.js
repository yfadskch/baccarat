const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// MongoDB connection
mongoose
    .connect("mongodb://localhost:27017/baccarat_game", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/game", require("./routes/game"));

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

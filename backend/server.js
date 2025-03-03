const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";


mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
    res.send("API is running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

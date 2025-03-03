const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Отримання даних всіх користувачів
router.get('/', authMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
});

// Оновлення профілю користувача
router.put('/profile', authMiddleware, async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ message: 'Користувача не знайдено' });

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.passwordHash = password;

        await user.save();
        res.json({ message: 'Профіль оновлено', user });
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
});

module.exports = router;

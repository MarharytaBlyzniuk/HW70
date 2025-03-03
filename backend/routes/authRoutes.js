const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// Реєстрація користувача
router.post('/register', [
    check('name', 'Ім’я обов’язкове').notEmpty(),
    check('email', 'Невірний формат email').isEmail(),
    check('password', 'Пароль має бути мінімум 6 символів').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'Користувач вже існує' });

        user = new User({ name, email, passwordHash: password, role: role || 'user' });
        await user.save();

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ token, userId: user._id, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
});

// Логін користувача
router.post('/login', [
    check('email', 'Введіть коректний email').isEmail(),
    check('password', 'Введіть пароль').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Невірний email або пароль' });

        const isMatch = await user.isValidPassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Невірний email або пароль' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Помилка сервера' });
    }
});

module.exports = router;

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// Регистрация пользователя
router.post('/register', [
    check('name', 'Имя обязательно').notEmpty(),
    check('email', 'Введите корректный email').isEmail(),
    check('password', 'Пароль должен быть минимум 6 символов').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password, role } = req.body; // добавляем role

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'Такой пользователь уже существует' });

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        user = new User({ name, email, passwordHash, role: role || 'user' });
        await user.save();

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ token, userId: user._id, role: user.role });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});


// Авторизация пользователя
router.post('/login', [
    check('email', 'Введите корректный email').isEmail(),
    check('password', 'Введите пароль').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Неверный email или пароль' });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return res.status(400).json({ message: 'Неверный email или пароль' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;

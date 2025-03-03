const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.put('/profile', authMiddleware, async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findById(req.user.userId);

        if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.passwordHash = await bcrypt.hash(password, salt);
        }

        await user.save();
        res.json({ message: 'Профиль обновлен', user });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

module.exports = router;

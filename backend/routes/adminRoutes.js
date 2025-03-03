const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// Адмін-панель
router.get('/admin-panel', authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: 'Вітаємо в адмін-панелі!' });
});

module.exports = router;

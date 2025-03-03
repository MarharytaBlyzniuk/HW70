const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/admin-panel', authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: 'Добро пожаловать в админ-панель!' });
});

module.exports = router;

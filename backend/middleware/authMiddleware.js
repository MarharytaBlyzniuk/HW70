const jwt = require('jsonwebtoken');



module.exports = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: 'Нет авторизации' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Неверный токен' });
    }
};
module.exports = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Доступ запрещен' });
    }
    next();
};
const authMiddleware = require('../middleware/authMiddleware');

router.get('/profile', authMiddleware, async (req, res) => {
    const user = await User.findById(req.user.userId).select('-passwordHash');
    res.json(user);
});

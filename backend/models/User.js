
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Створення схеми користувача
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, { timestamps: true });

// Методи для порівняння паролів
userSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.passwordHash);
};

// Перед збереженням хешуємо пароль
userSchema.pre('save', async function(next) {
    if (!this.isModified('passwordHash')) return next();
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
    next();
});

module.exports = mongoose.model('User', userSchema);

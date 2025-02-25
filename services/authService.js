const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const saltRounds = 10;
const secretKey = process.env.JWT_SECRET;

class authService {
    static async register({ full_name, email, password, role }) {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('Пользователь с таким email уже существует');
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({
            full_name,
            email,
            password_hash: hashedPassword,
            role,
        });
        return newUser;
    }

    static async login({ email, password }) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Неверный email или пароль');
        }

        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            throw new Error('Неверный email или пароль');
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            secretKey,
            { expiresIn: '1h' }
        );
        return token;
    }
}

module.exports = authService;

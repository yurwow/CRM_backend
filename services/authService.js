const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const saltRounds = 10;
const accessKey = process.env.JWT_SECRET;
const refreshKey = process.env.JWT_REFRESH_SECRET;

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
            refresh_token: null,
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

        const payload = { id: user.id, email: user.email, role: user.role };
        const accessToken = jwt.sign(payload, accessKey, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, refreshKey, { expiresIn: '7d' });

        await user.update({ refresh_token: refreshToken });

        return { accessToken, refreshToken };
    }

    static async refresh(oldRefreshToken) {
        if (!oldRefreshToken) {
            throw new Error('Refresh-токен отсутствует');
        }
        let payload;
        try {
            payload = jwt.verify(oldRefreshToken, refreshKey);
        } catch (err) {
            throw new Error('Неверный refresh-токен');
        }
        const user = await User.findOne({ where: { id: payload.id, refresh_token: oldRefreshToken } });
        if (!user) {
            throw new Error('Недействительный refresh-токен');
        }

        const newPayload = { id: user.id, email: user.email, role: user.role };
        const accessToken = jwt.sign(newPayload, accessKey, { expiresIn: '15m' });
        const refreshToken = jwt.sign(newPayload, refreshKey, { expiresIn: '7d' });
        await user.update({ refresh_token: refreshToken });

        return { accessToken, refreshToken };
    }

    static async logout(refreshToken) {
        if (!refreshToken) {
            return;
        }
        const user = await User.findOne({ where: { refresh_token: refreshToken } });
        if (user) {
            await user.update({ refresh_token: null });
        }
    }
}

module.exports = authService;

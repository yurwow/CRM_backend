const authService = require('../services/authService');

class authController {
    static async register(req, res) {
        try {
            const { full_name, email, password, role } = req.body;
            const newUser = await authService.register({ full_name, email, password, role });
            res.status(201).json({ message: 'Пользователь создан', user: newUser });
        } catch (err) {
            console.error(err);
            res.status(err.message.includes('Пользователь') ? 400 : 500)
                .json({ error: err.message || 'Ошибка сервера' });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const tokens = await authService.login({ email, password });

            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            res.json({ accessToken: tokens.accessToken });
        } catch (err) {
            console.error(err);
            res.status(err.message.includes('Неверный') ? 400 : 500)
                .json({ error: err.message || 'Ошибка сервера' });
        }
    }

    static async refresh(req, res) {
        try {
            const { refreshToken } = req.cookies;
            const tokens = await authService.refresh(refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.json({ accessToken: tokens.accessToken });
        } catch (err) {
            console.error(err);
            res.status(403).json({ error: err.message || 'Недействительный токен' });
        }
    }

    static async logout(req, res) {
        try {
            const { refreshToken } = req.cookies;
            await authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.json({ message: 'Вы вышли из системы' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }
}

module.exports = authController;

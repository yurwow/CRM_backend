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
            const token = await authService.login({ email, password });
            res.json({ token });
        } catch (err) {
            console.error(err);
            res.status(err.message.includes('Неверный') ? 400 : 500)
                .json({ error: err.message || 'Ошибка сервера' });
        }
    }
}

module.exports = authController;

const express = require('express');
const usersRouter = express.Router();
const User = require('../models/User');

usersRouter.get('/', async (req, res) => {
    try {
        const users = User.findAll()
        res.json(users)
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'Ошибка сервера'})
    }
})

usersRouter.get('/', async (req, res) => {
    try {
        const user = User.findByPk(req.params.id)
        if (!user) return res.status(404).json({error: 'Пользователь не найден'})
        res.json(user)
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'Ошибка сервера'})
    }
})

usersRouter.post('/', async (req, res) => {
    try {
        const {full_name, email, password_hash, role} = req.body;
        const newUser = await User.create({
            full_name,
            email,
            password_hash,
            role,
        });
        res.status(201).json(newUser);
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'Ошибка сервера'})
    }
})

usersRouter.put('/', async (req, res) => {
    try {
        const { full_name, email, password_hash, role } = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        await user.update({
            full_name,
            email,
            password_hash,
            role,
        });
        res.json(user);
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'Ошибка сервера'})
    }
})

usersRouter.delete('/', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        await user.destroy();
        res.json({ message: 'Пользователь удалён' })
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'Ошибка сервера'})
    }
})

module.exports = usersRouter;

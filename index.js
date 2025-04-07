const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const { sequelize } = require('./models');
const clientsRouter = require('./routes/clientsRouter');
const interactionRouter = require('./routes/interactionRouter');
const usersRouter = require('./routes/usersRouter');
const authRouter = require('./routes/authRouter');
const statisticsRouter = require('./routes/statisticsRouter');
const authMiddleware = require('./middleware/authMiddleware');
const setupSwagger = require('./swagger');

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/clients', authMiddleware, clientsRouter);
app.use('/api/interactions', authMiddleware, interactionRouter);
app.use('/api/users', usersRouter);
app.use('/api/statistics', authMiddleware, statisticsRouter);

setupSwagger(app);

sequelize
    .sync({ alter: true })
    .then(() => {
        console.log('Все модели синхронизированы');
        app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
    })
    .catch((err) => console.error('Ошибка синхронизации:', err));

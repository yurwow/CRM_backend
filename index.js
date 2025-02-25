const express = require('express')
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000;
const {sequelize} = require('./models')
const clientsRouter = require('./routes/clientsRouter')
const interactionRouter = require('./routes/interactionRouter')
const usersRouter = require('./routes/usersRouter')
const authRouter = require('./routes/authRouter')
const authMiddleware = require('./middleware/authMiddleware')

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/clients', authMiddleware, clientsRouter)
app.use('/api/interactions',authMiddleware ,interactionRouter)
// app.use('/api/users', usersRouter)

sequelize
    .sync({ alter: true })
    .then(() => {
        console.log('Все модели синхронизированы');
        app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
    })
    .catch(err => console.error('Ошибка синхронизации:', err));

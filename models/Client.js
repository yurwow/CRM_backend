const { DataTypes } = require('sequelize');
const User = require('./User');
const {sequelize} = require("../config/db");

const Client = sequelize.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact_person: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    industry: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    // Внешний ключ для пользователя (менеджера)
    manager_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    tableName: 'clients',
});

// Определяем связь: один клиент может принадлежать менеджеру (User)
Client.belongsTo(User, { foreignKey: 'manager_id', as: 'manager' });

module.exports = Client

const { DataTypes } = require('sequelize');
const Client = require('./Client');
const {sequelize} = require("../config/db");

const Interaction = sequelize.define('Interaction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Client,
            key: 'id',
        },
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'interactions',
});

// Определяем связь: одно взаимодействие принадлежит клиенту
Interaction.belongsTo(Client, { foreignKey: 'client_id', as: 'client' });

module.exports = Interaction;

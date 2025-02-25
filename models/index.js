const { sequelize } = require('../config/db');

const User = require('./User');
const Client = require('./Client');
const Interaction = require('./Interaction');

User.hasMany(Client, { foreignKey: 'manager_id', as: 'clients' });
Client.hasMany(Interaction, { foreignKey: 'client_id', as: 'interactions' });

module.exports = {
    sequelize,
    User,
    Client,
    Interaction,
};

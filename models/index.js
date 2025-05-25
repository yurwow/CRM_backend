const { sequelize } = require('../config/db');

const User = require('./User');
const Client = require('./Client');
const Interaction = require('./Interaction');
const Contractor = require('./Contractor');
const ContractorReview = require('./ContractorReview');

User.hasMany(Client, { foreignKey: 'manager_id', as: 'clients' });
Client.hasMany(Interaction, { foreignKey: 'client_id', as: 'interactions' });

User.hasMany(ContractorReview, { foreignKey: 'author_id', as: 'reviews' });
Contractor.hasMany(ContractorReview, { foreignKey: 'contractor_id', as: 'reviews' });
ContractorReview.belongsTo(User, { foreignKey: 'author_id', as: 'author' });
ContractorReview.belongsTo(Contractor, { foreignKey: 'contractor_id', as: 'contractor' });

module.exports = {
    sequelize,
    User,
    Client,
    Interaction,
    Contractor,
    ContractorReview,
};

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
// const ContractorReview = require('ContractorReview')

const Contractor = sequelize.define(
    'Contractor',
    {
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
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        specialization: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        info: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'contractors',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
);

// Contractor.hasMany(ContractorReview, { foreignKey: 'contractor_id' });

module.exports = Contractor;

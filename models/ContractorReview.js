const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

const ContractorReview = sequelize.define(
    'ContractorReview',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        contractor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'contractors',
                key: 'id',
            },
        },
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'contractor_reviews',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false,
    },
);

module.exports = ContractorReview;

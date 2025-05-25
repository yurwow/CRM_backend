const { Contractor, ContractorReview, User, sequelize } = require('../models');

class ContractorService {
    static async getAllContractors() {
        const contractors = await Contractor.findAll({
            include: [
                {
                    model: ContractorReview,
                    as: 'reviews',
                    attributes: ['id', 'rating', 'comment', 'created_at'],
                },
            ],
            attributes: {
                include: [
                    [
                        sequelize.literal(`(
                            SELECT AVG("rating")
                            FROM "contractor_reviews"
                            WHERE "contractor_id" = "Contractor"."id"
                        )`),
                        'average_rating',
                    ],
                ],
            },
        });

        return contractors;
    }
    static async getContractorById(id) {
        const contractor = await Contractor.findByPk(id, {
            include: [
                {
                    model: ContractorReview,
                    as: 'reviews',
                    attributes: ['id', 'rating', 'comment', 'created_at'],
                    include: [
                        {
                            model: User,
                            as: 'author',
                            attributes: ['full_name'],
                        },
                    ],
                },
            ],
            attributes: {
                include: [
                    [
                        sequelize.literal(`(
                        SELECT AVG("rating")
                        FROM "contractor_reviews"
                        WHERE "contractor_id" = "Contractor"."id"
                    )`),
                        'average_rating',
                    ],
                ],
            },
        });

        return contractor;
    }

    static async createContractor(data) {
        return Contractor.create(data);
    }

    static async updateContractor(id, data) {
        const contractor = await Contractor.findByPk(id);
        if (!contractor) return null;
        return contractor.update(data);
    }

    static async deleteContractor(id) {
        const contractor = await Contractor.findByPk(id);
        if (!contractor) return null;
        await contractor.destroy();
        return true;
    }
}

module.exports = ContractorService;

const { ContractorReview, User, Contractor } = require('../models');

class ContractorReviewService {
    static async getAllReviews() {
        return ContractorReview.findAll({
            include: [
                { model: User, as: 'author', attributes: ['id', 'full_name'] },
                { model: Contractor, as: 'contractor' },
            ],
        });
    }

    static async getReviewsByContractor(contractorId) {
        return ContractorReview.findAll({
            where: { contractor_id: contractorId },
            include: [{ model: User, as: 'author', attributes: ['id', 'full_name'] }],
        });
    }

    static async createReview(data) {
        return ContractorReview.create(data);
    }

    static async updateReview(id, data) {
        const review = await ContractorReview.findByPk(id);
        if (!review) return null;
        return review.update(data);
    }

    static async deleteReview(id) {
        const review = await ContractorReview.findByPk(id);
        if (!review) return null;
        await review.destroy();
        return true;
    }
}

module.exports = ContractorReviewService;

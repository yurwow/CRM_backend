const ContractorReviewService = require('../services/ContractorReviewService');

class ContractorReviewController {
    static async getAll(req, res) {
        try {
            const reviews = await ContractorReviewService.getAllReviews();
            res.json(reviews);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async getByContractor(req, res) {
        try {
            const contractorId = req.params.contractorId;
            const reviews = await ContractorReviewService.getReviewsByContractor(contractorId);
            res.json(reviews);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async create(req, res) {
        try {
            const review = await ContractorReviewService.createReview(req.body);
            res.status(201).json(review);
        } catch (err) {
            console.error(err);
            res.status(400).json({ error: 'Invalid data' });
        }
    }

    static async update(req, res) {
        try {
            const updated = await ContractorReviewService.updateReview(req.params.id, req.body);
            if (!updated) return res.status(404).json({ error: 'Not found' });
            res.json(updated);
        } catch (err) {
            console.error(err);
            res.status(400).json({ error: 'Invalid data' });
        }
    }

    static async remove(req, res) {
        try {
            const deleted = await ContractorReviewService.deleteReview(req.params.id);
            if (!deleted) return res.status(404).json({ error: 'Not found' });
            res.json({ message: 'Deleted' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = ContractorReviewController;

const ContractorService = require('../services/ContractorService');

class ContractorController {
    static async getAll(req, res) {
        try {
            const contractors = await ContractorService.getAllContractors();
            res.json(contractors);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async getById(req, res) {
        try {
            const contractor = await ContractorService.getContractorById(req.params.id);
            if (!contractor) return res.status(404).json({ error: 'Not found' });
            res.json(contractor);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async create(req, res) {
        try {
            const contractor = await ContractorService.createContractor(req.body);
            res.status(201).json(contractor);
        } catch (err) {
            console.error(err);
            res.status(400).json({ error: 'Invalid data' });
        }
    }

    static async update(req, res) {
        try {
            const updated = await ContractorService.updateContractor(req.params.id, req.body);
            if (!updated) return res.status(404).json({ error: 'Not found' });
            res.json(updated);
        } catch (err) {
            console.error(err);
            res.status(400).json({ error: 'Invalid data' });
        }
    }

    static async remove(req, res) {
        try {
            const deleted = await ContractorService.deleteContractor(req.params.id);
            if (!deleted) return res.status(404).json({ error: 'Not found' });
            res.json({ message: 'Deleted' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = ContractorController;

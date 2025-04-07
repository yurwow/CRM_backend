const InteractionService = require('../services/interactionService');

class InteractionController {
    static async getAll(req, res) {
        try {
            const interactions = await InteractionService.getAllInteractions();
            res.json(interactions);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка на сервере' });
        }
    }

    static async getById(req, res) {
        try {
            const interaction = await InteractionService.getInteractionById(req.params.id);
            if (!interaction) {
                return res.status(404).json({ error: 'Взаимодействие не найдено' });
            }
            res.json(interaction);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка на сервере' });
        }
    }

    static async getByClient(req, res) {
        try {
            const clientId = req.params.clientId;
            const interactions = await InteractionService.getInteractionsByClientId(clientId);
            res.json(interactions);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    static async create(req, res) {
        try {
            const createInteraction = await InteractionService.createInteraction(req.body);
            res.json(createInteraction);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка на сервере' });
        }
    }

    static async update(req, res) {
        try {
            const updateInteraction = await InteractionService.updateInteraction(req.params.id, req.body);
            res.json(updateInteraction);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка на сервере' });
        }
    }

    static async delete(req, res) {
        try {
            const deleteInteraction = await InteractionService.deleteInteraction(req.params.id);
            res.json(deleteInteraction);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Ошибка на сервере' });
        }
    }
}

module.exports = InteractionController;

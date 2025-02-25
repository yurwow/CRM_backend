const { Interaction, Client } = require('../models');

class InteractionService {
    static async getAllInteractions() {
        return await Interaction.findAll({
            include: [{ model: Client, as: 'client' }],
        })
    }

    static async getInteractionById(id) {
        return await Interaction.findByPk(id, {
            include: [{ model: Client, as: 'client' }],
        })
    }

    static async getInteractionsByClientId(clientId) {
        return await Interaction.findAll({
            where: { client_id: clientId },
            include: [{ model: Client, as: 'client' }],
        });
    }

    static async createInteraction(data) {
        const { client_id, type, notes, date } = data;
        const client = await Client.findByPk(client_id);
        if (!client) {
            throw new Error('Клиент не найден');
        }
        return await Interaction.create({
            client_id,
            type,
            notes,
            date,
        });
    }

    static async updateInteraction(id, data) {
        const interaction = await Interaction.findByPk(id);
        if (!interaction) {
            throw new Error('Клиент не найден');
        }
        const { client_id, type, notes, date } = data;
        await interaction.update({
            client_id,
            type,
            notes,
            date,
        });
        return interaction;
    }

    static async deleteInteraction(id) {
        const interaction = await Interaction.findByPk(id);
        if (!interaction) {
            throw new Error('Клиент не найден');
        }
        await interaction.destroy();
        return interaction;
    }
}

module.exports = InteractionService;

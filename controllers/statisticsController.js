const { Interaction, Client } = require("../models");
const { Sequelize, Op } = require("sequelize");

class StatisticsController {
    static async getClientStatistics(req, res) {
        try {
            const { days = 30, startDate, endDate } = req.query;

            // Общее количество клиентов
            const totalClients = await Client.count();

            // Количество новых клиентов за период (по умолчанию за последние 30 дней)
            const newClientsCondition = startDate && endDate
                ? { createdAt: { [Op.between]: [new Date(startDate), new Date(endDate)] } }
                : { createdAt: { [Op.gte]: new Date(new Date() - days * 24 * 60 * 60 * 1000) } };

            const newClients = await Client.count({ where: newClientsCondition });

            // Количество активных клиентов (у которых были взаимодействия за последние N дней)
            const activeClients = await Interaction.count({
                distinct: true,
                col: "client_id",
                where: {
                    createdAt: { [Op.gte]: new Date(new Date() - days * 24 * 60 * 60 * 1000) }
                }
            });

            // Общее количество взаимодействий
            const interactionsCount = await Interaction.count();

            // Количество взаимодействий по типам
            const interactionsByType = await Interaction.findAll({
                attributes: ['type', [Sequelize.fn('COUNT', 'type'), 'count']],
                group: ['type'],
                raw: true
            });

            // Среднее количество взаимодействий на одного клиента
            const averageInteractionsPerClient = totalClients > 0 ? interactionsCount / totalClients : 0;

            res.json({
                totalClients,
                newClients,
                activeClients,
                interactionsCount,
                interactionsByType,
                averageInteractionsPerClient: averageInteractionsPerClient.toFixed(2)
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Ошибка при загрузке статистики" });
        }
    }
}

module.exports = StatisticsController;

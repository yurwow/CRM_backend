const { Interaction, Client } = require('../models');
const { Sequelize, Op } = require('sequelize');

class StatisticsController {
    static async getClientStatistics(req, res) {
        try {
            const { days = 30, startDate } = req.query;

            const now = new Date();
            const currentPeriodStart = startDate ? new Date(startDate) : new Date(now - days * 24 * 60 * 60 * 1000);
            const previousPeriodStart = new Date(currentPeriodStart - days * 24 * 60 * 60 * 1000);

            // Общее количество клиентов
            const totalClients = await Client.count();

            // Количество новых клиентов за текущий и предыдущий периоды
            const newClientsCurrent = await Client.count({
                where: { createdAt: { [Op.gte]: currentPeriodStart } },
            });

            const newClientsPrevious = await Client.count({
                where: { createdAt: { [Op.between]: [previousPeriodStart, currentPeriodStart] } },
            });

            // Количество взаимодействий за текущий и предыдущий периоды
            const interactionsCurrent = await Interaction.count({
                where: { createdAt: { [Op.gte]: currentPeriodStart } },
            });

            const interactionsPrevious = await Interaction.count({
                where: { createdAt: { [Op.between]: [previousPeriodStart, currentPeriodStart] } },
            });

            // Расчет процентного роста
            const clientGrowth =
                newClientsPrevious > 0 ? ((newClientsCurrent - newClientsPrevious) / newClientsPrevious) * 100 : newClientsCurrent > 0 ? 100 : 0;

            const interactionGrowth =
                interactionsPrevious > 0
                    ? ((interactionsCurrent - interactionsPrevious) / interactionsPrevious) * 100
                    : interactionsCurrent > 0
                      ? 100
                      : 0;

            // Средний рост активности (по клиентам и взаимодействиям)
            const activityGrowth = (clientGrowth + interactionGrowth) / 2;

            // Количество взаимодействий по типам
            const interactionsByType = await Interaction.findAll({
                attributes: ['type', [Sequelize.fn('COUNT', 'type'), 'count']],
                group: ['type'],
                raw: true,
            });

            // Среднее количество взаимодействий на одного клиента
            const averageInteractionsPerClient = totalClients > 0 ? interactionsCurrent / totalClients : 0;

            // Количество клиентов по месяцам за последний год
            const clientsByMonth = await Client.findAll({
                attributes: [
                    [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('createdAt')), 'month'],
                    [Sequelize.fn('COUNT', '*'), 'count'],
                ],
                where: {
                    createdAt: { [Op.gte]: new Date(now.getFullYear(), now.getMonth() - 11, 1) },
                },
                group: [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('createdAt'))],
                order: [[Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('createdAt')), 'ASC']],
                raw: true,
            });

            // Количество взаимодействий по месяцам за последний год
            const interactionsByMonth = await Interaction.findAll({
                attributes: [
                    [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('createdAt')), 'month'],
                    [Sequelize.fn('COUNT', '*'), 'count'],
                ],
                where: {
                    createdAt: { [Op.gte]: new Date(now.getFullYear(), now.getMonth() - 11, 1) },
                },
                group: [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('createdAt'))],
                order: [[Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('createdAt')), 'ASC']],
                raw: true,
            });

            res.json({
                totalClients,
                newClientsCurrent,
                newClientsPrevious,
                interactionsCurrent,
                interactionsPrevious,
                clientGrowth: clientGrowth.toFixed(2),
                interactionGrowth: interactionGrowth.toFixed(2),
                activityGrowth: activityGrowth.toFixed(2),
                interactionsByType,
                averageInteractionsPerClient: averageInteractionsPerClient.toFixed(2),
                clientsByMonth,
                interactionsByMonth,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ошибка при загрузке статистики' });
        }
    }
}

module.exports = StatisticsController;

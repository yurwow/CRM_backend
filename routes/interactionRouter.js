const express = require('express');
const router = express.Router();
const InteractionController = require('../controllers/interactionController');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * tags:
 *   - name: Interactions
 *     description: Управление взаимодействиями с клиентами
 */

/**
 * @swagger
 * /interactions:
 *   get:
 *     summary: Получить все взаимодействия
 *     tags: [Interactions]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Список всех взаимодействий
 *       401:
 *         description: Не авторизован
 */
router.get('/', InteractionController.getAll);

/**
 * @swagger
 * /interactions/{id}:
 *   get:
 *     summary: Получить взаимодействие по ID
 *     tags: [Interactions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID взаимодействия
 *     responses:
 *       200:
 *         description: Данные взаимодействия
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Взаимодействие не найдено
 */
router.get('/:id', InteractionController.getById);

/**
 * @swagger
 * /interactions/client/{clientId}:
 *   get:
 *     summary: Получить все взаимодействия клиента
 *     tags: [Interactions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID клиента
 *     responses:
 *       200:
 *         description: Список взаимодействий клиента
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Клиент не найден
 */
router.get('/client/:clientId', InteractionController.getByClient);

/**
 * @swagger
 * /interactions:
 *   post:
 *     summary: Создать новое взаимодействие
 *     tags: [Interactions]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - client_id
 *               - type
 *               - notes
 *               - date
 *             properties:
 *               client_id:
 *                 type: integer
 *                 example: 1
 *               type:
 *                 type: string
 *                 example: "Звонок"
 *               notes:
 *                 type: string
 *                 example: "Обсудили условия контракта"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-03-05T10:00:00Z"
 *     responses:
 *       201:
 *         description: Взаимодействие создано
 *       401:
 *         description: Не авторизован
 *       400:
 *         description: Ошибка валидации
 */
router.post('/', InteractionController.create);

/**
 * @swagger
 * /interactions/{id}:
 *   put:
 *     summary: Обновить взаимодействие
 *     tags: [Interactions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID взаимодействия
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               client_id:
 *                 type: integer
 *                 example: 1
 *               type:
 *                 type: string
 *                 example: "Встреча"
 *               notes:
 *                 type: string
 *                 example: "Заключили договор"
 *               date:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-03-05T14:00:00Z"
 *     responses:
 *       200:
 *         description: Взаимодействие обновлено
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Взаимодействие не найдено
 */
router.put('/:id', InteractionController.update);

/**
 * @swagger
 * /interactions/{id}:
 *   delete:
 *     summary: Удалить взаимодействие
 *     tags: [Interactions]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID взаимодействия
 *     responses:
 *       200:
 *         description: Взаимодействие удалено
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Взаимодействие не найдено
 */
router.delete('/:id', InteractionController.delete);

module.exports = router;

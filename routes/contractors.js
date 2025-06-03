const express = require('express');
const router = express.Router();
const ContractorController = require('../controllers/ContractorsController');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * tags:
 *   name: Contractors
 *   description: Управление подрядчиками
 */

/**
 * @swagger
 * /contractors:
 *   get:
 *     summary: Получить список всех подрядчиков
 *     tags: [Contractors]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Список подрядчиков
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contractor'
 */
router.get('/', ContractorController.getAll);

/**
 * @swagger
 * /api/contractors:
 *   post:
 *     summary: Создать нового подрядчика
 *     tags: [Contractors]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContractorInput'
 *     responses:
 *       201:
 *         description: Подрядчик успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contractor'
 *       400:
 *         description: Ошибка валидации
 */
router.post('/', ContractorController.create);

/**
 * @swagger
 * /api/contractors/{id}:
 *   get:
 *     summary: Получить информацию о подрядчике по ID
 *     tags: [Contractors]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Информация о подрядчике
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contractor'
 *       404:
 *         description: Подрядчик не найден
 */
router.get('/:id', ContractorController.getById);

/**
 * @swagger
 * /api/contractors/{id}:
 *   put:
 *     summary: Обновить данные подрядчика
 *     tags: [Contractors]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContractorInput'
 *     responses:
 *       200:
 *         description: Подрядчик обновлён
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contractor'
 *       400:
 *         description: Ошибка запроса
 */
router.put('/:id', ContractorController.update);

/**
 * @swagger
 * /api/contractors/{id}:
 *   delete:
 *     summary: Удалить подрядчика по ID
 *     tags: [Contractors]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Подрядчик удалён
 *       404:
 *         description: Подрядчик не найден
 */
router.delete('/:id', ContractorController.remove);

module.exports = router;

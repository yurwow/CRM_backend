const express = require('express');
const router = express.Router();
const ContractorReviewController = require('../controllers/ContractorReviewController');

/**
 * @swagger
 * tags:
 *   name: Contractor Reviews
 *   description: Маршруты управления отзывами подрядчиков
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ContractorReview:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         contractor_id:
 *           type: integer
 *         author_id:
 *           type: integer
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *         comment:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 *     ContractorReviewInput:
 *       type: object
 *       required:
 *         - contractor_id
 *         - author_id
 *         - rating
 *       properties:
 *         contractor_id:
 *           type: integer
 *         author_id:
 *           type: integer
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *         comment:
 *           type: string
 */

/**
 * @swagger
 * /api/contractor-reviews:
 *   get:
 *     summary: Получить все отзывы
 *     tags: [Contractor Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список отзывов
 */

/**
 * @swagger
 * /api/contractor-reviews/contractor/{contractorId}:
 *   get:
 *     summary: Получить отзывы по ID подрядчика
 *     tags: [Contractor Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contractorId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID подрядчика
 *     responses:
 *       200:
 *         description: Отзывы подрядчика
 */

/**
 * @swagger
 * /api/contractor-reviews:
 *   post:
 *     summary: Создать отзыв
 *     tags: [Contractor Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContractorReviewInput'
 *     responses:
 *       201:
 *         description: Отзыв создан
 */

/**
 * @swagger
 * /api/contractor-reviews/{id}:
 *   put:
 *     summary: Обновить отзыв
 *     tags: [Contractor Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID отзыва
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContractorReviewInput'
 *     responses:
 *       200:
 *         description: Отзыв обновлён
 */

/**
 * @swagger
 * /api/contractor-reviews/{id}:
 *   delete:
 *     summary: Удалить отзыв
 *     tags: [Contractor Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID отзыва
 *     responses:
 *       200:
 *         description: Отзыв удалён
 */

router.get('/', ContractorReviewController.getAll);
router.get('/contractor/:contractorId', ContractorReviewController.getByContractor);
router.post('/', ContractorReviewController.create);
router.put('/:id', ContractorReviewController.update);
router.delete('/:id', ContractorReviewController.remove);

module.exports = router;

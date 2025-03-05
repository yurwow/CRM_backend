const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/clientController');

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
 *   - name: Clients
 *     description: Управление клиентами
 */

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Получить всех клиентов
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Список всех клиентов
 *       401:
 *         description: Не авторизован
 */
router.get('/', ClientController.getAll);

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Получить клиента по ID
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID клиента
 *     responses:
 *       200:
 *         description: Данные клиента
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Клиент не найден
 */
router.get('/:id', ClientController.getById);

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Создать нового клиента
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - contact_person
 *               - phone
 *               - email
 *               - address
 *               - industry
 *               - manager_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Компания ООО Альфа"
 *               contact_person:
 *                 type: string
 *                 example: "Иван Иванов"
 *               phone:
 *                 type: string
 *                 example: "+7 900 123-45-67"
 *               email:
 *                 type: string
 *                 example: "info@company.com"
 *               address:
 *                 type: string
 *                 example: "г. Москва, ул. Ленина, 1"
 *               industry:
 *                 type: string
 *                 example: "Металлургия"
 *               manager_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Клиент успешно создан
 *       401:
 *         description: Не авторизован
 *       400:
 *         description: Ошибка валидации
 */
router.post('/', ClientController.create);

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Обновить данные клиента
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID клиента
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Компания ООО Бета"
 *               contact_person:
 *                 type: string
 *                 example: "Петр Петров"
 *               phone:
 *                 type: string
 *                 example: "+7 900 555-12-34"
 *               email:
 *                 type: string
 *                 example: "contact@company.com"
 *               address:
 *                 type: string
 *                 example: "г. Санкт-Петербург, ул. Гагарина, 5"
 *               industry:
 *                 type: string
 *                 example: "Машиностроение"
 *               manager_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Клиент успешно обновлен
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Клиент не найден
 */
router.put('/:id', ClientController.update);

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Удалить клиента
 *     tags: [Clients]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID клиента
 *     responses:
 *       200:
 *         description: Клиент успешно удален
 *       401:
 *         description: Не авторизован
 *       404:
 *         description: Клиент не найден
 */
router.delete('/:id', ClientController.delete);

module.exports = router;

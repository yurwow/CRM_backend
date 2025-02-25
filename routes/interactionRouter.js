const express = require('express');
const router = express.Router();
const InteractionController = require('../controllers/interactionController');

router.get('/', InteractionController.getAll);
router.get('/:id', InteractionController.getById);
router.post('/', InteractionController.create);
router.put('/:id', InteractionController.update);
router.delete('/:id', InteractionController.delete);

router.get('/client/:clientId', InteractionController.getByClient);


module.exports = router;

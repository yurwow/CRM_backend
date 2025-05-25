const express = require('express');
const router = express.Router();
const ContractorController = require('../controllers/ContractorsController');

router.get('/', ContractorController.getAll);
router.post('/', ContractorController.create);
router.get('/:id', ContractorController.getById);
router.put('/:id', ContractorController.update);
router.delete('/:id', ContractorController.remove);

module.exports = router;

const express = require('express');
const router = express.Router();
const ContractorReviewController = require('../controllers/ContractorReviewController');

router.get('/', ContractorReviewController.getAll);
router.get('/contractor/:contractorId', ContractorReviewController.getByContractor);
router.post('/', ContractorReviewController.create);
router.put('/:id', ContractorReviewController.update);
router.delete('/:id', ContractorReviewController.remove);

module.exports = router;

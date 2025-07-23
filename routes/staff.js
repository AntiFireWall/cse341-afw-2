const express = require('express');

const router = express.Router();

const staffController = require('../controllers/staff');

router.get('/', staffController.getAll);

router.get('/:id', staffController.getSingle);

router.post('/', staffController.validateStaff, staffController.createStaff);

router.put('/:id', staffController.validateStaff, staffController.updateStaff);

router.delete('/:id', staffController.deleteStaff);

module.exports = router;

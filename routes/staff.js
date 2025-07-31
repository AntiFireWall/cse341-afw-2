const express = require('express');

const router = express.Router();

const staffController = require('../controllers/staff');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', staffController.getAll);

router.get('/:id', staffController.getSingle);

router.post('/', isAuthenticated, staffController.validateStaff, staffController.createStaff);

router.put('/:id', isAuthenticated, staffController.validateStaff, staffController.updateStaff);

router.delete('/:id', isAuthenticated, staffController.deleteStaff);

module.exports = router;

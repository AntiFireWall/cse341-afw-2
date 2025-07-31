const express = require('express');

const router = express.Router();

const bookController = require('../controllers/book');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', bookController.getAll);

router.get('/:id', bookController.getSingle);

router.post('/', isAuthenticated, bookController.validateBook, bookController.createBook);

router.put('/:id', isAuthenticated, bookController.validateBook, bookController.updateBook);

router.delete('/:id', isAuthenticated, bookController.deleteBook);

module.exports = router;

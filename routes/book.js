const express = require('express');

const router = express.Router();

const bookController = require('../controllers/book');

router.get('/', bookController.getAll);

router.get('/:id', bookController.getSingle);

router.post('/', bookController.validateBook, bookController.createBook);

router.put('/:id', bookController.validateBook, bookController.updateBook);

router.delete('/:id', bookController.deleteBook);

module.exports = router;

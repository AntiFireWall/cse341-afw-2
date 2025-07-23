const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { body, validationResult } = require('express-validator')

const getAll = async (req, res) => {
  // #swagger.tags=['Book']

  try {
    const result = await mongodb.getDatabase().db().collection('books').find();
  } catch (err) {
    res.status(500).json('The database is not working')
  };

  const result = await mongodb.getDatabase().db().collection('books').find();
  result
    .toArray()
    .then((books) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(books || 'The database is empty');
    })
    .catch((err) => {
      res.status(500).json("There has been an issue with the request.");
    });
};

const getSingle = async (req, res) => {
  // #swagger.tags=['Book']

  try {
    const result = await mongodb.getDatabase().db().collection('books').find();
  } catch (err) {
    res.status(500).json('The database is not working')
  };

  try{
    const bookId = ObjectId.createFromHexString(req.params.id);
  } catch (BSONError) {
    res.status(500).json('The provided id is incorrect.');
  }

  const bookId = ObjectId.createFromHexString(req.params.id)

  const result = await mongodb
    .getDatabase()
    .db()
    .collection('books')
    .find({ _id: bookId });
  result.toArray().then((books) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(books[0] || 'The provided id is not in the database.');
  }).catch((err) => {
    res.status(500).json(err.withMessage('There has been an issue with the request.'));
  });
}

const createBook = async (req,res) => {
  // #swagger.tags=['Book']

  try {
    const result = await mongodb.getDatabase().db().collection('books').find();
  } catch (err) {
    res.status(500).json('The database is not working')
  };

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  };

  const book = {
    title: req.body.title,
    publicationDate: req.body.publicationDate,
    author: req.body.author,
    description: req.body.description,
    isbn: req.body.isbn
  };
  const response = await mongodb.getDatabase().db().collection('books').insertOne(book);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating a book.')
  };
}

const updateBook = async (req,res) => {
  // #swagger.tags=['Book']

  try {
    const result = await mongodb.getDatabase().db().collection('books').find();
  } catch (err) {
    res.status(500).json('The database is not working')
  };

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  };

  try{
    const bookId = ObjectId.createFromHexString(req.params.id);
  } catch (BSONError) {
    res.status(500).json('The provided id is incorrect.');
  };

  const bookId = ObjectId.createFromHexString(req.params.id);
  const book = {
    title: req.body.title,
    publicationDate: req.body.publicationDate,
    author: req.body.author,
    description: req.body.description,
    isbn: req.body.isbn
  };
  const response = await mongodb.getDatabase().db().collection('books').replaceOne({ _id: bookId}, book);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the book.')
  };
}

const deleteBook = async (req,res) => {
  // #swagger.tags=['Book']

  try {
    const result = await mongodb.getDatabase().db().collection('books').find();
  } catch (err) {
    res.status(500).json('The database is not working')
  };

  try{
    const bookId = ObjectId.createFromHexString(req.params.id);
  } catch (BSONError) {
    res.status(500).json('The provided id is incorrect.');
  };

  const bookId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb.getDatabase().db().collection('books').deleteOne({ _id: bookId}, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting a book.')
  };
}

const validateBook = [
  body('title').notEmpty().withMessage('Title is required'),
  body('publicationDate')
    .notEmpty().withMessage('Publication date is required')
    .matches(/^\d{2}\/\d{2}\/\d{4}$/).withMessage('Date must be in dd/mm/yyyy format'),
  body('author').notEmpty().withMessage('Author is required'),
  body('description')
    .isLength({ max: 300 }).withMessage('Description must be 300 characters or fewer'),
  body('isbn').notEmpty().withMessage('ISBN is required')
];

module.exports = {
  getAll,
  getSingle,
  createBook,
  updateBook,
  deleteBook,
  validateBook
};

const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { body, validationResult } = require('express-validator')

const getAll = async (req, res) => {
  // #swagger.tags=['Staff']

  try {
    const result = await mongodb.getDatabase().db().collection('staff').find();
  } catch (err) {
    res.status(500).json('The database is not working')
  };

  const result = await mongodb.getDatabase().db().collection('staff').find();
  result
    .toArray()
    .then((staff) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(staff || 'The database is empty');
    })
    .catch((err) => {
      res.status(500).json("There has been an issue with the request.");
    });
};

const getSingle = async (req, res) => {
  // #swagger.tags=['Staff']

  try {
    const result = await mongodb.getDatabase().db().collection('staff').find();
  } catch (err) {
    res.status(500).json('The database is not working')
  };

  try{
    const staffId = ObjectId.createFromHexString(req.params.id);
  } catch (BSONError) {
    res.status(500).json('The provided id is incorrect.');
  }

  const staffId = ObjectId.createFromHexString(req.params.id)

  const result = await mongodb
    .getDatabase()
    .db()
    .collection('staff')
    .find({ _id: staffId });
  result.toArray().then((staff) => {
    res.setHeader('Content-Type', 'application/json');
    if (staff.length !== 0) {
      res.status(200).json(staff[0]); 
    } 
    else {
      res.status(400).json('The provided id is not in the database.');
    }
  }).catch((err) => {
    res.status(500).json(err.withMessage('There has been an issue with the request.'));
  });
}

const createStaff = async (req,res) => {
  // #swagger.tags=['Staff']

  try {
    const result = await mongodb.getDatabase().db().collection('staff').find();
  } catch (err) {
    res.status(500).json('The database is not working')
  };

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  };

  const staff = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    position: req.body.position,
    hireDate: req.body.hireDate,
    email: req.body.email,
    department: req.body.department,
    employmentStatus: req.body.employmentStatus
  };
  const response = await mongodb.getDatabase().db().collection('staff').insertOne(staff);
  if (response.acknowledged) {
    res.status(200).send('The staff member has been added to the database.');
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating a staff member.')
  };
}

const updateStaff = async (req,res) => {
  // #swagger.tags=['Staff']

  try {
    const result = await mongodb.getDatabase().db().collection('staff').find();
  } catch (err) {
    res.status(500).json('The database is not working')
  };

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()});
  };

  try{
    const staffId = ObjectId.createFromHexString(req.params.id);
  } catch (BSONError) {
    res.status(500).json('The provided id is incorrect.');
  };

  const staffId = ObjectId.createFromHexString(req.params.id);
  const staff = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    position: req.body.position,
    hireDate: req.body.hireDate,
    email: req.body.email,
    department: req.body.department,
    employmentStatus: req.body.employmentStatus
  };
  const response = await mongodb.getDatabase().db().collection('staff').replaceOne({ _id: staffId}, staff);
  if (response.modifiedCount > 0) {
    res.status(200).send('The staff member information has been updated in the database.');
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the staff member.')
  };
}

const deleteStaff = async (req,res) => {
  // #swagger.tags=['Staff']

  try {
    const result = await mongodb.getDatabase().db().collection('staff').find();
  } catch (err) {
    res.status(500).json('The database is not working')
  };

  try{
    const staffId = ObjectId.createFromHexString(req.params.id);
  } catch (BSONError) {
    res.status(500).json('The provided id is incorrect.');
  };

  const staffId = ObjectId.createFromHexString(req.params.id);
  const response = await mongodb.getDatabase().db().collection('staff').deleteOne({ _id: staffId}, true);
  if (response.deletedCount > 0) {
    res.status(200).send('The staff member has been removed from the database.');
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting a staff member.')
  };
}

const validateStaff = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),

  body('lastName').trim().notEmpty().withMessage('Last name is required'),

  body('position').trim().notEmpty().withMessage('Position is required'),

  body('hireDate').notEmpty().withMessage('Hire date is required').isISO8601().withMessage('Hire date must be a valid date (YYYY-MM-DD)'),

  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Must be a valid email address').normalizeEmail(),

  body('department').trim().notEmpty().withMessage('Department is required'),

  body('employmentStatus').trim().notEmpty().withMessage('Employment Status is required')
];

module.exports = {
  getAll,
  getSingle,
  createStaff,
  updateStaff,
  deleteStaff,
  validateStaff
};

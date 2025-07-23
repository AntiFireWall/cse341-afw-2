const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  // #swagger.tags=['Hello lad!']
  res.send('Hello lad!');
});

router.use('/books', require('./book'));
router.use('/staff', require('./staff'));

module.exports = router;

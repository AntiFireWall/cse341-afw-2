const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));

// router.get('/', (req, res) => {
//   // #swagger.tags=['Hello lad!']
//   res.send('Hello lad!');
// });

router.get('/login', passport.authenticate('github'), (req,res) => {});

router.get('/logout', function(req,res,next) {
  req.logout(function(err) {
    if(err) {
      return next(err);
    };
    res.redirect('/');
  })
});

router.use('/books', require('./book'));
router.use('/staff', require('./staff'));

module.exports = router;

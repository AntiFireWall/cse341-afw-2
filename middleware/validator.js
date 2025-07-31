const { body, validationResult } = require('express-validator')

const bookValidationRules = () => {
    const rules = [
        body('title').isLength({min: 1}),
        body('description').isLength({max: 200})
    ]
    return rules
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  bookValidationRules,
  validate,
}
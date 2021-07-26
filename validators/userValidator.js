const { body, validationResult } = require('express-validator')
const ApiError = require('../error/ApiError')

exports.userValidationResult = (req, res, next) => {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    console.log(result)
    const error = result.array()[0].msg
    return next(ApiError.unprocessable(error))
  }
  next()
}

exports.userValidator = [
  body('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Validation error: Email is required')
    .isEmail()
    .withMessage('Validation error: Email is not valid'),
  body('password')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Validation error: Password is required')
    .isLength({ min: 6 })
    .withMessage('Validation error: Passwor must be atleast 8 characters long'),
]

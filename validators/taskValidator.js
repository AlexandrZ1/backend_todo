const { check, validationResult } = require('express-validator')
const ApiError = require('../error/ApiError')

exports.taskValidationResult = (req, res, next) => {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    const error = result.array()[0].msg
    return ApiError.unprocessable(error)
  }
}

exports.taskValidator = [
  check('done')
    .isBoolean()
    .withMessage(
      "Validation error: Invalid value 'done'. The value must be boolean."
    ),
]

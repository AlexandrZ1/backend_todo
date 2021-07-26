const {
  body,
  query,
  param,
  validationResult,
  check,
} = require('express-validator')
const ApiError = require('../error/ApiError')
const db = require('../db.json')

exports.taskValidationResult = (req, res, next) => {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    console.log(result)
    const error = result.array()[0].msg
    return next(ApiError.unprocessable(error))
  }
  next()
}

exports.taskValidator = [
  check('done')
    .optional({ checkFalsy: true })
    .isBoolean()
    .withMessage(
      "Validation error: Invalid value 'done', the value must be boolean"
    ),
  check('name')
    .optional({ checkFalsy: true })
    .trim()
    .isString()
    .withMessage(
      "Validation error: Invalid value 'name', the value must be string"
    )
    .isLength({ min: 2 })
    .withMessage(
      'Validation error: Message must be at least 2 characters long'
    ),
  check('userId')
    .trim()
    .isUUID()
    .withMessage("Validation error: Invalid value 'userId' in params"),
  check('taskId')
    .trim()
    .optional({ checkFalsy: true })
    .isUUID()
    .withMessage("Validation error: Invalid value 'taskId' in params"),
  query('order')
    .optional({ checkFalsy: true })
    .isIn(['done', 'undone'])
    .withMessage("Validation error: Invalid value 'order' in query params"),
  query('filterBy')
    .isIn(['asc', 'desc'])
    .optional({ checkFalsy: true })
    .withMessage("Validation error: Invalid value 'filterBy' in query params"),
]

exports.taskPutchValidator

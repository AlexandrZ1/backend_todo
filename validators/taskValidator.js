const { body, query, param, validationResult } = require('express-validator')
const ApiError = require('../error/ApiError')

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
  body('done')
    .optional({ checkFalsy: true })
    .isBoolean()
    .withMessage(
      "Validation error: Invalid value 'done', the value must be boolean"
    ),
  body('name')
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
  param('userId')
    .trim()
    .isUUID()
    .withMessage("Validation error: Invalid value 'userId' in params"),
  param('taskId')
    .trim()
    .optional({ checkFalsy: true })
    .isUUID()
    .withMessage("Validation error: Invalid value 'taskId' in params"),
  query('order')
    .optional({ checkFalsy: true })
    .isIn(['asc', 'desc'])
    .withMessage("Validation error: Invalid value 'order' in query params"),
  query('filterBy')
    .isIn(['done', 'undone'])
    .optional({ checkFalsy: true })
    .withMessage("Validation error: Invalid value 'filterBy' in query params"),
  query('page')
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage("Validation error: Invalid value 'page' in query params"),
  query('visibleRows')
    .optional({ checkFalsy: true })
    .isInt()
    .withMessage(
      "Validation error: Invalid value 'visibleRows' in query params"
    ),
]

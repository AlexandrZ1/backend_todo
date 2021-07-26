const Router = require('express')
const router = new Router()
const taskController = require('../controllers/taskController')
const authMiddleware = require('../middleware/authMiddleware')
const {
  taskValidator,
  taskValidationResult,
} = require('../validators/taskValidator')

router.post(
  '',
  authMiddleware,
  taskValidator,
  taskValidationResult,
  taskController.createTask
)
router.patch(
  '/:taskId',
  authMiddleware,
  taskValidator,
  taskValidationResult,
  taskController.updateTask
)
router.delete(
  '/:taskId',
  authMiddleware,
  taskValidator,
  taskValidationResult,
  taskController.deleteTask
)
router.get(
  '/',
  authMiddleware,
  taskValidator,
  taskValidationResult,
  taskController.getTasks
)

module.exports = router

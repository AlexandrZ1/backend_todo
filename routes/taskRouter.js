const Router = require('express')
const router = new Router()
const taskController = require('../controllers/taskController')
const {
  taskValidator,
  taskValidationResult,
} = require('../validators/taskValidator')

router.post(
  '/:userId',
  taskValidator,
  taskValidationResult,
  taskController.createTask
)
router.patch(
  '/:userId/:taskId',
  taskValidator,
  taskValidationResult,
  taskController.updateTask
)
router.delete(
  '/:userId/:taskId',
  taskValidator,
  taskValidationResult,
  taskController.deleteTask
)
router.get(
  '/:userId',
  taskValidator,
  taskValidationResult,
  taskController.getTasks
)

module.exports = router

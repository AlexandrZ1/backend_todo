const Router = require('express')
const router = new Router()
const taskController = require('../controllers/taskController')
const {
  taskValidator,
  taskValidationResult,
} = require('../validators/taskValidator')

router.post('/:userId', taskController.createTask)
router.patch('/:userId/:taskId', taskController.updateTask)
router.delete('/:userId/:taskId', taskController.deleteTask)
router.get('/:userId', taskController.getTasks)

module.exports = router

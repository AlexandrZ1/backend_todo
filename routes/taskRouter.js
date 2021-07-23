const Router = require('express')
const router = new Router()
const taskController = require('')

router.post('/:tasdId', taskController.createTask)
router.patch('/:userId:taskId', taskController.updateTask)
router.delete('/:userId:taskId', taskController.deleteTask)
router.get('/:userId', taskController.getTasks)

module.exports = router

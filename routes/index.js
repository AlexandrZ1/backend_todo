const Router = require('express')
const router = new Router()
const taskRouter = require('./taskRouter')
const userRouter = require('./userRouter')

router.use('/task', taskRouter)
router.use('/user', userRouter)

module.exports = router

const Router = require('express')
const router = new Router()
const taskRouter = require('./taskRouter')

router.use('/task', taskRouter)

module.exports = router

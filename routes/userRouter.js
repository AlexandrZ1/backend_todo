const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const {
  userValidator,
  userValidationResult,
} = require('../validators/userValidator')

router.post(
  '/registration',
  userValidator,
  userValidationResult,
  userController.registration
)
router.post('/login', userValidator, userValidationResult, userController.login)
router.get('/auth', authMiddleware, userController.checkAuth)

module.exports = router

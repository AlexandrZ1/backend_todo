const ApiError = require('../error/ApiError')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
let db = require('../db.json')
const { writeDb } = require('../utils/queryDb')

const generateJwt = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class userController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body
      if (db.users.some((item) => item.email === email)) {
        return next(ApiError.badRequest('User with same email exist'))
      }
      const hashPassword = await bcrypt.hash(password, 5)
      const user = { id: uuidv4(), email: email, password: hashPassword }
      db.users = [...db.users, user]
      await writeDb()
      const token = generateJwt(user.id, user.email)
      return res.status(200).json({ token })
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body
      let user = null
      db.users.map((item) => {
        if (item.email === email) user = item
      })
      if (!!!user) {
        return next(ApiError.badRequest('User with same email not found'))
      }
      let comparePassword = bcrypt.compareSync(password, user.password)
      if (!comparePassword) {
        return next(ApiError.badRequest('Wrong password'))
      }
      const token = generateJwt(user.id, user.email)
      return res.status(200).json({ token })
    } catch (e) {
      next(ApiError.internal(e.message))
    }
  }
  async checkAuth(req, res) {
    try {
      const token = generateJwt(req.user.id, req.user.email)
      return res.status(200).json({ token })
    } catch {
      next(ApiError.internal(e.message))
    }
  }
}

module.exports = new userController()

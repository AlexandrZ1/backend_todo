const ApiError = require('../error/ApiError')
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db.json')
const { writeDb } = require('../utils/queryDb')

const generateJwt = (id, email) => {
  return jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: '1h' })
}

class userController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body
      if (db.users.some((item) => item.email === email)) {
        return next(ApiError.badRequest('User with same email exist'))
      }
      const hashPassword = await bcrypt.hash(password, 5)
      db = {
        tasks,
        users: [
          ...users,
          { id: uuidv4(), email: email, password: hashPassword },
        ],
      }
      await writeDb()
      const token = generateJwt(user.uuid, user.email)
      return res.status(200).json({ token })
    } catch (e) {
      next()
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const user = db.users.filter((item) => item.email === email)
      if (!!user) {
        return next(ApiError.badRequest('User with same email not find'))
      }
      let comparePassword = bcrypt.compareSync(password, user.password)
      if (!comparePassword) {
        return next(ApiError.internal('Wrong password'))
      }
      const token = generateJwt(user.id, user.email)
      return res.status(200).json({ token })
    } catch (e) {
      next()
    }
  }
  async checkToken(req, res) {
    const token = generateJwt(req.user.id, req.user.email)
    return res.status(200).json({ token })
  }
}

module.exports = new userController()

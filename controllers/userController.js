const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db.json')

const generateJwt = (id, email) => {
  return jwt.sign({ id, email }, process.env.SECRET_KEY, { expiresIn: '1h' })
}

class userController {
  async redistration(req, res, next) {
    return res.json('token')
  }
  async login(req, res, next) {
    return res.json('token')
  }
  async checkToken(req, res, next) {
    return res.json('token')
  }
}

module.exports = new userController()

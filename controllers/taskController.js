let db = require('../db.json')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
const ApiError = require('../error/ApiError')

class TaskController {
  async createTask(req, res) {
    try {
      const { userId } = req.params
      const { name } = req.body
      db.tasks = [
        ...db.tasks,
        {
          uuid: uuidv4(),
          name: name,
          done: false,
          userId: userId,
          updatedAt: moment().utcOffset('').format(),
          createdAt: moment().utcOffset('').format(),
        },
      ]
      const string = JSON.stringify(db, null, '\t')
      fs.writeFile('db.json', string, function (err) {
        if (err) return console.error(err)
        console.log('done')
      })
      return res.json(db.tasks)
    } catch (e) {
      return res.status(500)
    }
  }
  async updateTask(req, res) {
    try {
      const { userId, taskId } = req.params
      const { name, done } = req.body
      db.tasks = db.tasks.map((item) => {
        if (item.uuid === taskId) {
          if (!!name) item.name = name
          if (!!done) item.done = done
          item.updatedAt = moment().utcOffset('').format()
          return item
        }
        return item
      })
      const string = JSON.stringify(db, null, '\t')
      await fs.writeFile('db.json', string, function (err) {
        if (err) return console.error(err)
        console.log('done')
      })
      return res.json(db.tasks)
    } catch (e) {
      return res.status(500)
    }
  }
  async deleteTask(req, res) {
    try {
      const { userId, taskId } = req.params
      db.tasks = db.tasks.filter((item) => item.uuid !== taskId)
      const string = JSON.stringify(db, null, '\t')
      await fs.writeFile('db.json', string, function (err) {
        if (err) return console.error(err)
        console.log('done')
      })
      return res.json(db.tasks)
    } catch (e) {
      return res.status(500)
    }
  }

  async getTasks(req, res, next) {
    try {
      const { filterBy, order, page } = req.query
      console.log(req.query)
      const { name, done } = req.body
      let tasks = db.tasks.sort(
        order === 'asc'
          ? (a, b) => (a.updatedAt > b.updatedAt ? 1 : -1)
          : (a, b) => (a.updatedAt > b.updatedAt ? -1 : 1)
      )
      tasks = db.tasks.filter((item) =>
        filterBy === 'done'
          ? item.done
          : filterBy === 'undone'
          ? !item.done
          : true
      )
      if (!!page) return res.json(tasks.slice(5 * (page - 1), 5 * page))
      return res.json(tasks)
    } catch (e) {
      return res.status(500)
    }
  }
}

module.exports = new TaskController()

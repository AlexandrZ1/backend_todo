let db = require('../db.json')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
const ApiError = require('../error/ApiError')
const { writeDb } = require('../utils/queryDb')

class TaskController {
  async createTask(req, res, next) {
    try {
      const { userId } = req.params
      const { name } = req.body
      const task = {
        uuid: uuidv4(),
        name: name,
        done: false,
        userId: userId,
        updatedAt: moment().utcOffset('').format(),
        createdAt: moment().utcOffset('').format(),
      }
      if (userId) {
        if (db.tasks.some((item) => item.name === task.name)) {
          return next(ApiError.badRequest('Task with same name exist'))
        }
        db.tasks = [...db.tasks, task]
        await writeDb()
        return res.status(200).json(task)
      } else next(ApiError.badRequest('User is not found'))
    } catch (e) {
      next()
    }
  }

  async updateTask(req, res, next) {
    try {
      const { userId, taskId } = req.params
      const { name, done } = req.body
      let task
      if (userId) {
        if (!db.tasks.some((item) => item.uuid === taskId)) {
          return next(ApiError.badRequest('Task not found'))
        }
        if (db.tasks.some((item) => item.name === name)) {
          return next(ApiError.badRequest('Task with same name exist'))
        }
        db.tasks = db.tasks.map((item) => {
          if (item.uuid === taskId) {
            if (!!name) item.name = name
            if (!!done) item.done = done
            item.updatedAt = moment().utcOffset('').format()
            task = item
            return item
          }
          return item
        })
        await writeDb()
        return res.status(200).json(task)
      } else return next(ApiError.badRequest('User is not found'))
    } catch (e) {
      next()
    }
  }

  async deleteTask(req, res, next) {
    try {
      const { userId, taskId } = req.params
      if (userId) {
        if (!db.tasks.some((item) => item.uuid === taskId)) {
          return next(ApiError.badRequest('Task not found'))
        }
        const task = db.tasks.find((item) => item.uuid === taskId)
        console.log(task)
        db.tasks = db.tasks.filter((item) => item.uuid !== taskId)
        await writeDb()
        return res.status(200).json(task)
      } else return next(ApiError.badRequest('User is not found'))
    } catch (e) {
      next()
    }
  }

  getTasks(req, res, next) {
    try {
      const { userId } = req.params
      const { filterBy, order, page } = req.query
      if (userId) {
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
        if (!!page)
          return res.status(200).json({
            tasks: tasks.slice(
              5 *
                ((Math.ceil(tasks.length / 5) <= page
                  ? Math.ceil(tasks.length / 5)
                  : page) -
                  1),
              5 *
                (Math.ceil(tasks.length / 5) <= page
                  ? Math.ceil(tasks.length / 5)
                  : page)
            ),
            page:
              Math.ceil(tasks.length / 5) <= page
                ? Math.ceil(tasks.length / 5)
                : page,
          })
        else
          return res.status(200).json({
            tasks: tasks.slice(0, 5),
            page: 1,
          })
      } else return next(ApiError.badRequest('User is not found'))
    } catch (e) {
      next()
    }
  }
}

module.exports = new TaskController()
let bd = require('../bd/bd')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')

class TaskController {
  async createTask(req, res) {
    try {
      const { userId } = req.params
      const { name } = req.body
      bd.tasks = [
        ...bd.tasks,
        {
          uuid: uuidv4(),
          name: name,
          done: false,
          userId: userId,
          updatedAt: moment().zone(-180).format(),
          createdAt: moment().zone(-180).format(),
        },
      ]
      const string = JSON.stringify(bd, null, '\t')
      await fs.writeFile('./bd/bd.json', string, function (err) {
        if (err) return console.error(err)
        console.log('done')
      })
      return res.json(bd.tasks)
    } catch (e) {
      return res.status(500)
    }
  }
  async updateTask(req, res) {
    try {
      const { userId, taskId } = req.params
      const { name, done } = req.body
      bd.tasks = bd.tasks.map((item) => {
        if (item.uuid === taskId) {
          if (!!name) item.name = name
          if (!!done) item.done = done
          item.updatedAt = moment().zone(-180).format()
          return item
        }
        return item
      })
      const string = JSON.stringify(bd, null, '\t')
      await fs.writeFile('./bd/bd.json', string, function (err) {
        if (err) return console.error(err)
        console.log('done')
      })
      return res.json(bd.tasks)
    } catch (e) {
      return res.status(500)
    }
  }
  async deleteTask(req, res) {
    try {
      const { userId, taskId } = req.params
      bd.tasks = bd.tasks.filter((item) => item.uuid !== taskId)
      const string = JSON.stringify(bd, null, '\t')
      await fs.writeFile('./bd/bd.json', string, function (err) {
        if (err) return console.error(err)
        console.log('done')
      })
      return res.json(bd.tasks)
    } catch (e) {
      return res.status(500)
    }
  }

  async getTasks(req, res) {
    try {
      const { filterBy, order } = req.query
      const { page } = req.params
      console.log(req.query)
      const { name, done } = req.body
      let tasks = bd.tasks.sort(
        order === 'asc'
          ? (a, b) => (a.updatedAt > b.updatedAt ? 1 : -1)
          : (a, b) => (a.updatedAt > b.updatedAt ? -1 : 1)
      )
      tasks = bd.tasks.filter((item) =>
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

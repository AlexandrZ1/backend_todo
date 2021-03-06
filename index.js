require('dotenv').config()
const express = require('express')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorMiddleware')
const { connectionDb } = require('./utils/queryDb')

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)

const start = async () => {
  try {
    await connectionDb()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()

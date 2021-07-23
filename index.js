require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/index')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

const start = () => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

start()

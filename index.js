const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 8000
const HOSTNAME = process.env.HOSTNAME

const connectDB = require('./src/config/db')
connectDB()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*'])
  res.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
  res.append('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

const userRoutes = require('./src/routes/userRoutes')
app.use('/api/user', userRoutes)

const postRoutes = require('./src/routes/postRoutes')
app.use('/api/v1/post', postRoutes)

app.listen(PORT, (req, res) => {
  console.log(`Server running on ${HOSTNAME}:${PORT}`)
})

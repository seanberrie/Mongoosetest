require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
const logger = require('morgan')
const PORT = process.env.PORT || 3000
const Book = require('./models/book')
const bookRouter = require('./routers/bookRouter')
// Database
require('./db')

// Configurations

// Middlware
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public', 'views')))
app.use(logger('dev'))
app.use(express.json())
app.use('/api/books', bookRouter)

// Routes
app.get('/', (req, res) => {
  res.sendFile('index.html')
})

/// /get statements

app.listen(PORT, err => {
  console.log(err || `Listening on port ${PORT}`)
})

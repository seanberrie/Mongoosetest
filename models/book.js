const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  image: String,
  releaseDate: String
})

const Book = mongoose.model('Book', bookSchema)
module.exports = Book

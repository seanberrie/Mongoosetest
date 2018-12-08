const Book = require('../models/book')

module.exports = {
  index: (req, res) => {
    Book.find({}, (err, books) => {
      if (err) res.json({ success: false, err })
      res.json({ success: true, books })
    })
  },

  create: (req, res) => {
    Book.create(req.body, (err, newBook) => {
      if (err) res.json({ success: false, err })
      res.json({ success: true, newBook })
    })
  },

  show: (req, res) => {
    Book.findById(req.params.id, (err, book) => {
      if (err) res.json({ success: false, err })
      res.json({ success: true, book })
    })
  },
  update: (req, res) => {
    let { body, params } = req
    Book.findByIdAndUpdate(params.id, body, { new: true }, (err, updateBook) => {
      if (err) res.json({ success: false, err })
      res.json({ success: true, updateBook })
    })
  },
  destroy: (req, res) => {
    Book.findByIdAndDelete(req.params.id, (err, deleteBook) => {
      if (err) res.json({ success: false, err })
      res.json({ success: true, deleteBook })
    })
  } }

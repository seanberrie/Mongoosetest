const express = require('express')
const Book = require('../controllers/book')
const router = express.Router()

router.get('/', Book.index)
router.get('/:id', Book.show)
router.post('/', Book.create)
router.patch('/:id', Book.update)
router.delete('/:id', Book.destroy)

module.exports = router

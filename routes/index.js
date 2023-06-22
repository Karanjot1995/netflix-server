const express = require('express')
const router = express.Router()

// router.get('/create-post' , postsController.create)

router.use('/users', require('./users'))

module.exports = router
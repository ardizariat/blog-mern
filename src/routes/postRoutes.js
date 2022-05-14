const router = require('express').Router()
const { index } = require('../app/controllers/postController')

router.get('/', index)

module.exports = router

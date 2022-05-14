const router = require('express').Router()
const {
  register,
  login,
  me,
  logout,
} = require('../app/controllers/userController')
const { protect } = require('../app/middleware/authMiddleware')

router.post('/register', register)
router.post('/login', login)
router.post('/logout', protect, logout)
router.get('/me', protect, me)

module.exports = router

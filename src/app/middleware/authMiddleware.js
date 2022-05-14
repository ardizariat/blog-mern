const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const dotenv = require('dotenv').config()

const protect = asyncHandler(async (req, res, next) => {
  let token
  const headers = req.headers.authorization
  if (headers && headers.startsWith('Bearer')) {
    try {
      // Get token from header
      token = headers.split(' ')[1]

      //   Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      //   Get user fropm token
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      res.status(401).json({ message: 'Not authorized' })
    }
  }

  if (!token) res.status(401).json({ message: 'Not authorized, no token' })
})

module.exports = {
  protect,
}

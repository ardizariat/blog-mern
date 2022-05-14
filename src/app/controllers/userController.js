const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv').config()

exports.register = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, password_confirmation } = req.body

    if (!name || !email || !password) {
      res.status(400).json({ message: 'Please enter all required fields!' })
    }

    if (password !== password_confirmation) {
      res.status(400).json({ message: 'Password confirmation not match' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      res.status(400).json({ message: 'User already' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    const user = {
      _id: newUser.id,
      name,
      email,
      token: generateToken(newUser.id),
    }

    if (newUser) {
      res.status(201).json({
        message: 'user created',
        data: user,
      })
    }

    res.status(201).json({})
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  //   Check email user
  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    const userLogin = {
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    }
    res.status(200).json({
      message: 'login success',
      data: userLogin,
    })
  } else {
    res.status(404).json({ message: 'user not found' })
  }
})

exports.me = asyncHandler(async (req, res) => {
  try {
    const { _id, name, email } = await User.findById(req.user.id)
    res.status(200).json({
      message: 'get data user login',
      data: { id: _id, name, email },
    })
  } catch (error) {
    res.status(401).json({ message: 'User not found' || error.message })
  }
})

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

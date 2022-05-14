const Post = require('../models/postModel')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

exports.index = asyncHandler(async (req, res) => {
  const per_page = req.query.per_page || 5
  const current_page = req.query.current_page || 1
  let total_data

  try {
    const totalPost = await Post.find().countDocuments()
    total_data = totalPost

    const posts = await Post.find()
      .skip((current_page - 1) * per_page)
      .limit(per_page)

    res.status(200).json({
      message: 'Get data post success',
      data: posts,
      total_data,
      per_page,
      current_page,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

exports.store = asyncHandler(async (req, res) => {
  const { title, body, status } = req.body
  if (!title || !body) {
    res
      .status(402)
      .json({ message: 'Please add a text field' || error.message })
  }
  try {
    const post = await Post.create({
      user: req.user.id,
      title,
      body,
      status,
    })
    if (post) {
      res.status(201).json({
        message: 'post created',
        data: post,
      })
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to insert post' || error.message })
  }
})

exports.show = asyncHandler(async (req, res) => {
  const postId = req.params.postId
  try {
    const post = await Post.findById(postId)
    if (!post) {
      res.status(404).json({ message: 'data not found' || error.message })
    }
    res.status(200).json({ message: 'get single post success', data: post })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

exports.update = asyncHandler(async (req, res) => {
  const postId = req.params.postId
  const userId = req.user.id
  const { title, body } = req.body
  try {
    const post = await Post.findById(postId)
    const user = await User.findById(userId)
    if (!post) {
      res.status(404).json({ message: 'data not found' || error.message })
    }
    if (post.user.toString() !== user.id) {
      res.status(403).json({ message: 'Not authorized' || error.message })
    }

    const postUpdate = await Post.findByIdAndUpdate(
      post.id,
      { title, body },
      {
        new: true,
      }
    )

    if (postUpdate)
      res.status(200).json({ message: 'Post updated', data: postUpdate })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

exports.destroy = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.postId
    const userId = req.user.id

    const post = await Post.findById(postId)
    const user = await User.findById(userId)

    if (!post) {
      res.status(400).json({ message: 'Post not found' || error.message })
    }
    if (post.user.toString() !== user.id) {
      res
        .status(403)
        .json({ message: 'not access to delete data' || error.message })
    }

    const deletePost = await Post.findByIdAndDelete(postId)
    if (deletePost) {
      res.status(200).json({ message: 'delete post success', data: deletePost })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

const Post = require('../models/postModel')
const asyncHandler = require('express-async-handler')

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

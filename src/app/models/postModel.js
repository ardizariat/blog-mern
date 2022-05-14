const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
      min: 5,
    },
    body: {
      type: String,
      required: true,
      min: 5,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Post = mongoose.model('Post', postSchema)

module.exports = Post

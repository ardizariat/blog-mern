const mongoose = require('mongoose')
const colors = require('colors')
const MONGODB_URI = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    const conn = mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`Database connected`.yellow.underline)
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

module.exports = connectDB

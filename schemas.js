const mongoose = require('mongoose')


const Com = new mongoose.Schema({
  com_id: {
    type: Number,
    required: true,
    index: {
      unique: true
    }
  },
  raw_html: {
    type: String,
    default: ''
  },
  status: {
    type: Number,
    default: 0
  },
  fetched_at: {
    type: Date,
    default: null
  }
})

module.exports = { Com }

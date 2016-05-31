const mongoose = require('mongoose')


const Com = new mongoose.Schema({
  com_id: {
    type: Number,
    required: true
  },
  raw_html: {
    type: String,
    default: ''
  },
  not_exist: {
    type: Boolean,
    default: false
  },
  fetched_at: {
    type: Date
  }
})

module.exports = { Com }

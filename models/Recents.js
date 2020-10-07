const mongoose = require('mongoose')

const RecentsSchema = new mongoose.Schema({
  keyword: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Please add a search result title']
  },
  results: {
    type: Array
  },
}, { timestamps: true })

module.exports = mongoose.model('RecentResultsSchema', RecentsSchema)
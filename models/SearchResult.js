const mongoose = require('mongoose');

const SearchResultSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Please add a search result title']
  },
  link: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Please add a link']
  },
  snippet: {
    type: String,
    required: [true, 'Please add a snippet']
  },
})

module.exports = mongoose.model('SearchResult', SearchResultSchema);
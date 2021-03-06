const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  name_en: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    trim: true,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  google_map: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)
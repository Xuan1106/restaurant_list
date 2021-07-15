const Restaurant = require('../restaurant')
const rawData = require('../../restaurant.json')
const seed = rawData.results
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('MongoDB connected.')
  seed.forEach((restaurant) => {
    Restaurant.create({
      id: restaurant.id,
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description
    })
  })
  console.log('Done!')
})
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000

const exphbs = require('express-handlebars')

const restaurantList = require('./restaurant.json')
const Restaurant = require('./models/restaurant.js')

mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => console.log('mongodb error'))
db.once('open', () => console.log('mongodb connected!'))

// set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// set static file
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description

  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description})
    .then(() => res.redirect('/'))
    .catch(erroe => console.log(error))

})
// app.get('/restaurants/:restaurant_id', (req, res) => {
//   const restaurant = restaurantList.results.find(restaurant => {
//     return restaurant.id.toString() === req.params.restaurant_id
//   })
//   res.render('show', { restaurant: restaurant })
// })

// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword.toLowerCase()
//   const restaurants = restaurantList.results.filter(restaurant => {
//     return restaurant.name.toLowerCase().includes(keyword)
//   })
//   res.render('index', { restaurant: restaurants, keyword: keyword })
// })
app.listen(port, () => {
  console.log(`express server run in http://localhost:${port}`)
})
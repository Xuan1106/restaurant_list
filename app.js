const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

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
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.put('/restaurants', (req, res) => {
  const {name, name_en, category, image, location, phone, google_map, rating, description} = req.body

  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description})
    .then(() => res.redirect('/'))
    .catch(erroe => console.log(error))

})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant}))
    .catch(error => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const {name, name_en, category, image, location, phone, google_map, rating, description} = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurants => restaurants.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})
/
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  Restaurant.find()
    .lean()
    .then((restaurants) => {
      restaurants = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
      )
      if (restaurants.length === 0) {
        res.render('index', { restaurants: restaurants, keyword: keyword,alert:`
          <h1 class="display-5 mt-5 text-info text-center"><i class="far fa-dizzy fa-lg"></i>  Sorry no results</h1>
        `})
      } else {
        res.render('index', { restaurants: restaurants, keyword: keyword })
      }
    })
})

app.listen(port, () => {
  console.log(`express server run in http://localhost:${port}`)
})
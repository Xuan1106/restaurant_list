const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000

const exphbs = require('express-handlebars')

const restaurantList = require('./restaurant.json')

mongoose.connect('mongodb://localhost/restaurant_list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', ()=> console.log('mongodb error'))
db.once('open', () => console.log('mongodb connected!'))

// set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// set static file
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => {
    return restaurant.id.toString() === req.params.restaurant_id
  })
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword)
  })
  res.render('index', { restaurant: restaurants, keyword: keyword })
})
app.listen(port, () => {
  console.log(`express server run in http://localhost:${port}`)
})
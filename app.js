const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const port = 3000
// set template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// set static file
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', {restaurant: restaurantList.results})
})

app.listen(port, () => {
  console.log(`express server run in http://localhost:${port}`)
})
const express = require('express')
const app = express()

const port = 3000

app.get('/', (req, res) => {
  res.send('this is my restaurant')
  // res.render('index')
})

app.listen(port, () => {
  console.log(`express server run in http://localhost:${port}`)
})
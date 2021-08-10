const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Restaurant = require('../restaurant')
const User = require('../user')
const rawData = require('../../restaurant.json')
const restaurantData = rawData.results
const db = require('../../config/mongoose')
const SEED_USER = [
  {
    name: '使用者一',
    email: 'user1@example.com',
    password: '12345678',
    restaurantId: [1, 2, 3]
  },
  {
    name: '使用者二',
    email: 'user2@example.com',
    password: '12345678',
    restaurantId: [4, 5, 6]
  }
]

db.once('open', () => {
  return Promise.all(SEED_USER.map(async (user) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    const createdUser = await User.create({
      name: user.name,
      email: user.email,
      password: hash
    })

    const restaurantArray = []
    restaurantData.forEach((restaurant) => {
      if (user.restaurantId.includes(restaurant.id)) {
        restaurant.userId = createdUser._id
        restaurantArray.push(restaurant)
      }
    })
    await Restaurant.insertMany(restaurantArray)
  }))
  .then(() => {
    console.log('Success to set seeder')
    db.close()
  })
})
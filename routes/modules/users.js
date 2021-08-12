const express = require('express')
const router = express.Router()

const passport = require('passport')
const bcrypt = require('bcryptjs')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  const error = req.flash('error')
  if (error[0] === 'Missing credentials') {
    error[0] = 'Please enter Email and password'
  }
  res.render('login',{ warning_msg: error[0] || res.locals.warning_msg })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: 'All fields are required except for name'})
  }

  if (password !== confirmPassword) {
    errors.push({ message: 'The password doesn\'t match the confirmed password'})
  }

  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email }).then(user => {
    if (user) {
      errors.push({ message: 'The Email beed registered'})
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    } 
    return bcrypt 
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
      name,
      email,
      password: hash
    }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))  
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You have successfully logged out')
  res.redirect('/users/login')
})
module.exports = router
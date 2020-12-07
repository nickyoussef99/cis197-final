/* eslint-disable linebreak-style */
const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')

const User = require('../models/user')

const router = express.Router()

router.get('/', (req, res) => {
  const { username } = req.session
  res.send(`${username} is logged in`)
})

router.post('/signup', async (req, res) => {
  const { username, password, favorite } = req.body
  try {
    await User.create({ username, password, favorite })
    res.send(`Successfully signed up ${username}!`)
  } catch {
    res.send('Failed to sign up!')
  }
})

router.post('/login', (req, res, next) => {
  const { username, password } = req.body

  User.findOne({ username, password }, (err, user) => {
    if (err) {
      next(err)
    } else if (user) {
      const { favorite } = user
      req.session.username = username
      req.session.password = password
      req.session.favorite = favorite
      res.send(`${req.session.username} is logged in`)
    } else {
      res.send('Failed to log in')
    }
  })
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = ''
  req.session.password = ''
  req.session.favorite = ''
  res.send('User logged out')
})

router.get('/isloggedin', (req, res) => {
  const { username } = req.session
  res.send(!!username)
})

router.get('/getUser', (req, res) => {
  const { username } = req.session
  res.send(username)
})

router.get('/getFavorite', (req, res) => {
  const { favorite } = req.session
  res.send(favorite)
})

module.exports = router

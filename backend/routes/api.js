/* eslint-disable linebreak-style */

const express = require('express')

const router = express.Router()
const sendSms = require('../twilio')

router.post('/sendMessage', (req, res) => {
  const { phone, message } = req
  const result = sendSms(phone, message)
  console.log(result)
  res.send('Done?')
  console.log(res)
})

module.exports = router

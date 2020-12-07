/* eslint-disable linebreak-style */
require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const sendSms = (phone, message) => {
  // eslint-disable-next-line global-require
  const client = require('twilio')(accountSid, authToken)
  client.messages
    .create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    })
}

module.exports = sendSms

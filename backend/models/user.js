/* eslint-disable linebreak-style */
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  favorite: { type: String, required: true },
  phone: { type: String, required: true },
})

module.exports = model('User', userSchema)

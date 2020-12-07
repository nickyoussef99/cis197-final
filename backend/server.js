/* eslint-disable linebreak-style */
// api key profootballapi: o2xWcbAVJF4CQ0SPOZ1wRDihIrqMs9Ky
// sportsdataio: aa8bf525b1a44d39b5010700c0b673fd
const mongoose = require('mongoose')
const express = require('express')
const cookieSession = require('cookie-session')
const path = require('path')
const AccountRouter = require('./routes/account')
const ApiRouter = require('./routes/api')

const app = express()
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/final'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.static('dist'))
app.use(express.json())

app.use(
  cookieSession({
    name: 'local-session',
    keys: ['nick'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }),
)

app.use('/account', AccountRouter)
app.use('/api', ApiRouter)

app.use((err, req, res, next) => {
  res.status(500)
  res.send('There was an error!')
})

// IMPORTANT: U NEED THIS
app.get('/favicon.ico', (_, res) => res.status(404).send())
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on 3000')
})

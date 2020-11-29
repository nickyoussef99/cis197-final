/* eslint-disable linebreak-style */
const isAuthenticated = (req, res, next) => {
  const { username } = req.session
  if (username) {
    next()
  } else {
    next(new Error('No user logged in'))
  }
}

module.exports = isAuthenticated

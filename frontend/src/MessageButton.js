/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/forbid-prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'
import axios from 'axios'

// const sendSms = require('../../backend/twilio.js')

const getNextGame = (favorite, games) => {
  let i
  for (i = 1; i < 18; i += 1) {
    const weekGames = games[i]
    let j
    for (j = 0; j < games.length; j += 1) {
      const game = weekGames[j]
      const { HomeName, AwayName, HomeScore } = game
      if (AwayName === favorite || HomeName === favorite) {
        if (!HomeScore) {
          return game
        }
      }
    }
  }
  return {}
}

const getNextGameMessage = (favorite, games, user) => {
  const game = getNextGame(favorite, games)
  if (game) {
    const {
      HomeName, AwayName, Channel, DateTime,
    } = game
    const date = new Date(DateTime)
    return `The next game for ${favorite} is ${HomeName} vs. ${AwayName} on ${date}. You can watch on ${Channel}.`
  }
  return `Sorry ${user}. No upcoming games for ${favorite} found.`
}

const sendMessage = async (phone, message) => {
  const res = await axios.post('/account/sendMessage', { phone, message })
}

const MessageButton = ({
  games, user, favorite, phone,
}) => (
  <Button
    variant="outline-success"
    onClick={() => {
      const gameMessage = getNextGameMessage(favorite, games, user)
      sendMessage(phone, gameMessage)
    }}
  >
    Remind me when the
    {' '}
    {favorite}
    {' '}
    play next
  </Button>
)

MessageButton.propTypes = {
  games: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  favorite: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
}

export default MessageButton

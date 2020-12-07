/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react'
import { ListGroup, Container, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'
import GameEntry from './GameEntry'
import WeekNav from './WeekNav'

const Schedule = ({
  week, setWeek, games, favorite,
}) => {
  const compare = (a, b) => {
    if (b.AwayName === favorite || b.HomeName === favorite
      || a.HomeName === favorite || a.AwayName === favorite) {
      return -1
    }
    return a > b
  }

  const [weekGames, setWeekGames] = useState(games[week])

  useEffect(() => {
    setWeekGames(games[week])
  }, [week])

  return (
    <Container>
      <Row>
        <WeekNav week={week} setWeek={setWeek} />
      </Row>
      <Row>
        <ListGroup>
          {
        weekGames.map(game => (
          <ListGroup.Item key={game.HomeName + game.AwayName + game.week}>
            <GameEntry game={game} />
          </ListGroup.Item>
        ))
        }
        </ListGroup>
      </Row>
    </Container>
  )
}

Schedule.propTypes = {
  week: PropTypes.number.isRequired,
  setWeek: PropTypes.func.isRequired,
  games: PropTypes.object.isRequired,
  favorite: PropTypes.string.isRequired,
}

export default Schedule

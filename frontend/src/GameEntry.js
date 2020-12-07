/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react'
import { Card, Image } from 'react-bootstrap'
import PropTypes from 'prop-types'
import MoreInfo from './MoreInfo'

const GameEntry = ({ game }) => {
  const {
    HomeName, AwayName, DateTime, Channel, HomeScore, AwayScore, HomeTeam, AwayTeam, StadiumDetails,
  } = game

  const [moreInfoVisible, setMoreInfo] = useState(false)

  let HomeCode = HomeTeam
  let AwayCode = AwayTeam
  if (HomeTeam === 'LAR') {
    HomeCode = 'LA'
  } else if (AwayTeam === 'LAR') {
    AwayCode = 'LA'
  }
  const imgSource = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/'
  const svg = '.svg'
  const homeImg = `${imgSource}${HomeCode}${svg}`
  const awayImg = `${imgSource}${AwayCode}${svg}`
  const date = new Date(DateTime)

  const dateString = String(date)
  const splitDate = dateString.split(' ')
  const time = splitDate[4]
  const splitTime = time.split(':')
  // eslint-disable-next-line radix
  const hourRaw = parseInt(splitTime[0])
  const hour = hourRaw > 12 ? `${String(hourRaw - 12)}` : `${String(hourRaw)}`
  const ampm = hourRaw > 12 ? 'PM' : 'AM'
  const timeProcessed = `${String(hour)}:${splitTime[1]} ${ampm}`
  const processedDateTime = `${splitDate[0]} ${splitDate[1]} ${splitDate[2]} ${splitDate[3]} ${timeProcessed}`

  return (
    <div>
      <MoreInfo
        show={moreInfoVisible}
        onHide={() => setMoreInfo(false)}
        HomeName={HomeName}
        AwayName={AwayName}
        StadiumDetails={StadiumDetails}
      />
      <Card style={{ width: '18rem' }} onClick={() => setMoreInfo(true)}>
        <Card.Body>
          <Image height="40px" width="40px" src={awayImg} />
          <h6>{AwayName}</h6>
          {AwayScore
        && (
        <h6>{AwayScore}</h6>
        )}
          <Image height="40px" width="40px" src={homeImg} />
          <h6>{HomeName}</h6>
          {HomeScore
        && (
        <h6>{HomeScore}</h6>
        )}
          <p>{String(processedDateTime)}</p>
          <p>{Channel}</p>
        </Card.Body>
      </Card>
    </div>
  )
}

GameEntry.propTypes = {
  game: PropTypes.object.isRequired,
}

export default GameEntry

/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react'
import { Nav } from 'react-bootstrap'
import PropTypes from 'prop-types'

const WeekNav = ({ week, setWeek }) => {
  const updateWeek = input => {
    if (input === '<') {
      if (week !== 1) {
        setWeek(week - 1)
      }
    } else if (input === '>') {
      if (week !== 17) {
        setWeek(week + 1)
      }
    }
  }
  return (
    <Nav onSelect={selectedKey => updateWeek(selectedKey)}>
      <Nav.Item>
        <Nav.Link eventKey="<">
          {'<'}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        {`Week ${week}`}
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey=">">
          {'>'}
        </Nav.Link>
      </Nav.Item>
    </Nav>
  )
}

WeekNav.propTypes = {
  week: PropTypes.number.isRequired,
  setWeek: PropTypes.func.isRequired,
}

export default WeekNav

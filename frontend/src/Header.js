/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-alert */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import {
  Navbar, Button, ButtonToolbar, Image,
} from 'react-bootstrap'

const Header = ({
  isLoggedIn, loggedIn, user, showLogin, showSignup, favorite, keys,
}) => {
  const [favoriteCode, setCode] = useState('')

  useEffect(async () => {
    let code = Object.keys(keys).find(key => keys[key] === favorite)
    if (code === 'LAR') {
      code = 'LA'
    }
    setCode(code)
  }, [favorite])

  const logOut = async () => {
    const res = await axios.post('/account/logout', {})
    const { status, data } = res
    if (status === 200) {
      isLoggedIn()
    } else {
      window.alert('Log out failed')
    }
  }
  const imgSource = 'https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/'
  const svg = '.svg'
  const faveImg = `${imgSource}${favoriteCode}${svg}`
  return (
    <Navbar>
      <Navbar.Brand href="#home">Nick&apos;s Score Center</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {loggedIn && favoriteCode
        && (
        <div>
          <Navbar.Text>
            Signed in as:
            {' '}
            {user}
          </Navbar.Text>
          <Image height="40px" width="40px" src={faveImg} />
          <Button variant="danger" onClick={e => logOut()}>Log Out</Button>
        </div>

        )}
        {!loggedIn
        && (
          <ButtonToolbar>
            <Button variant="outline-primary" onClick={e => showLogin(true)}>Log In</Button>
            <Button variant="outline-primary" onClick={e => showSignup(true)}>Sign Up</Button>
          </ButtonToolbar>
        )}
      </Navbar.Collapse>
    </Navbar>
  )
}

Header.propTypes = {
  isLoggedIn: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
  showLogin: PropTypes.func.isRequired,
  showSignup: PropTypes.func.isRequired,
  favorite: PropTypes.string.isRequired,
  keys: PropTypes.object.isRequired,
}

export default Header

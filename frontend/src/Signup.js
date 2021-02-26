/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable quote-props */
/* eslint-disable no-alert */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import axios from 'axios'

const Signup = ({
  show, onHide, teams, showLogin,
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [favorite, setTeam] = useState('Arizona Cardinals')

  const signup = async () => {
    onHide()
    const res = await axios.post('/account/signup', {
      username, password, favorite, phone,
    })
    const { status, data } = res
    if (status !== 200 || data.includes('Failed')) {
      window.alert('Sign up failed')
    }
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Sign Up
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="signup">
            <Form.Label>Username</Form.Label>
            <Form.Control preview="Username" onChange={e => setUsername(e.target.value)} />
            <Form.Label>Password</Form.Label>
            <Form.Control preview="Password" onChange={e => setPassword(e.target.value)} />
            <Form.Label>Phone number including country code (+1 for USA)</Form.Label>
            <Form.Control preview="Phone Number" onChange={e => setPhone(e.target.value)} />
            <Form.Label>Favorite Team</Form.Label>
            <Form.Control as="select" onChange={e => setTeam(e.target.value)}>
              {
                teams.map(team => (
                  <option key={team}>{team}</option>
                ))
              }
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>Cancel</Button>
        <Button variant="success" onClick={signup}>Sign Up</Button>
        <br />
        <p>
          Already have an account?
          <Button
            variant="outline-success"
            onClick={() => {
              onHide()
              showLogin()
            }}
          >
            Log in here
          </Button>
        </p>
      </Modal.Footer>
    </Modal>
  )
}

Signup.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  teams: PropTypes.array.isRequired,
  showLogin: PropTypes.func.isRequired,
}

export default Signup

/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable quote-props */
/* eslint-disable no-alert */
import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import axios from 'axios'

const Login = ({
  show, onHide, showSignup, isLoggedIn,
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    onHide()
    const res = await axios.post('/account/login', { username, password })
    const { status, data } = res
    if (status !== 200 || data.includes('Failed')) {
      window.alert('Log in failed')
    }
    isLoggedIn()
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
          Log In
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="login">
            <Form.Label>Username</Form.Label>
            <Form.Control preview="Username" onChange={e => setUsername(e.target.value)} />
            <Form.Label>Password</Form.Label>
            <Form.Control preview="Password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>Cancel</Button>
        <Button variant="success" onClick={login}>Log In</Button>
        <br />
        <p>
          Don&apos;t have an account?
          <Button
            variant="outline-success"
            onClick={() => {
              onHide()
              showSignup()
            }}
          >
            Sign up here
          </Button>
        </p>
      </Modal.Footer>
    </Modal>
  )
}

Login.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  showSignup: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.func.isRequired,
}

export default Login

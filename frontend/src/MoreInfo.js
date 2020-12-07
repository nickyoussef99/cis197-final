/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/forbid-prop-types */
import React from 'react'
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'

const MoreInfo = ({
  HomeName, AwayName, StadiumDetails, show, onHide,
}) => {
  const {
    City, State, Name, Capacity, Type,
  } = StadiumDetails
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {`${AwayName} @ ${HomeName}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{`Location: ${Name} ${City}, ${State}`}</h5>
        <h5>{`Capacity: ${Capacity}`}</h5>
        <h5>{`Type: ${Type}`}</h5>
      </Modal.Body>
    </Modal>
  )
}

MoreInfo.propTypes = {
  StadiumDetails: PropTypes.object.isRequired,
  HomeName: PropTypes.string.isRequired,
  AwayName: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
}

export default MoreInfo

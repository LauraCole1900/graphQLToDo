import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import "./style.css";

const SuccessModal = (props) => {

  return (
    <>
      <Modal show={props.show} onHide={props.hide} backdrop="static" keyboard={false} centered={true} className="modal">
        <Modal.Title>
          <Row>
            <Col sm={12}>
              <h1>Success!</h1>
            </Col>
          </Row>
        </Modal.Title>
        <Modal.Body>
          <Row>
            <Col sm={12}>
              <p>You've signed up for My GraphQL To-Do app.</p>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default SuccessModal;
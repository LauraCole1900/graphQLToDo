import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import "./style.css";

const ErrorModal = (props) => {

  return (
    <>
      <Modal show={props.show} onHide={props.hide} backdrop="static" keyboard={false} centered={true} className="modal">
        <Modal.Title>
          <Row>
            <Col sm={12}>
              <h1>Something went wrong.</h1>
            </Col>
          </Row>
        </Modal.Title>
        <Modal.Body>
          <Row>
            <Col sm={12}>
              {props.btnName === "Sign Up"
                ? <p>Your signup couldn't be processed at this time.</p>
                : <p>Your login couldn't be processed at this time.</p>}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ErrorModal;
import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
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
          {props.btnName === "Create" &&
            <>
              <Row>
                <Col sm={12}>
                  <p>You've created a new to-do!</p>
                </Col>
              </Row>
            </>}
            {props.btnName === "Delete" &&
            <>
              <Row>
                <Col sm={12}>
                  <p>You've deleted your to-do!</p>
                </Col>
              </Row>
            </>}
            {props.btnName === "Update" &&
            <>
              <Row>
                <Col sm={12}>
                  <p>You've edited your to-do!</p>
                </Col>
              </Row>
            </>}
        </Modal.Body>
        <Modal.Footer>
          {(props.btnName === "" || props.btnName === "Done" || props.btnName === "Create" || props.btnName === "Delete" || props.btnName === "Edit" || props.btnName === "Update") &&
            <Button data-toggle="popover" title="Close" className="button" onClick={props.hide}>Close</Button>}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SuccessModal;
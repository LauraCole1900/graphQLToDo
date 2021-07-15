import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { SigninForm } from "../";
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
          {props.buttonName === "Login" &&
            <>
              <Row>
                <Col sm={12}>
                  <p>You've signed up for My GraphQL To-Do app. Please log in to continue.</p>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <SigninForm setBtnName={props.setBtnName} buttonName={props.buttonName} handleClick={props.handleClick} setErrMessage={props.setErrMessage} handleShowError={props.handleShowError} />
                </Col>
              </Row>
            </>}
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
            {props.btnName === "Done" &&
            <>
              <Row>
                <Col sm={12}>
                  <p>Your to-do has been marked 'done'!</p>
                </Col>
              </Row>
            </>}
          {props.btnName === "Edit" &&
            <>
              <Row>
                <Col sm={12}>
                  <p>You've edited your to-do!</p>
                </Col>
              </Row>
            </>}
        </Modal.Body>
        <Modal.Footer>
          {(props.btnName === "" || props.btnName === "Done" || props.btnName === "Create" || props.btnName === "Delete" || props.buttonName === "Edit") &&
            <Button data-toggle="popover" title="Close" className="button" onClick={props.hide}>Close</Button>}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SuccessModal;
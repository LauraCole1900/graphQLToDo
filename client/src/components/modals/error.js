import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import "./style.css";

const ErrorModal = (props) => {
  const codeArr = props.errMessage?.split(" ");
  

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
              {props.btnName === "Sign Up" &&
                <>
                  <p>Your signup couldn't be processed at this time.</p>
                  {codeArr?.includes("E11000") &&
                    <p>The email you entered has already been registered.</p>}
                  {(props.errMessage === "User validation failed: email: Path `email` is required." || codeArr?.includes("Validator")) &&
                    <p>Please enter a valid email!</p>}
                  {props.errMessage === "User validation failed: password: Path `password` is required." &&
                    <p>Please enter a password!</p>}
                </>}
              {props.btnName === "Login" &&
                <>
                  <p>Your login information couldn't be located at this time. Are you sure you've signed up?</p>
                  {props.errMessage === "Incorrect password" &&
                    <p>The entered password does not match our records.</p>}
                </>}
              {(props.btnName === "Create") &&
                <>
                  <p>Your to-do couldn't be processed at this time.</p>
                </>}
              {(props.btnName === "Done" || props.btnName === "Edit" || props.btnName === "Update") &&
                <>
                  <p>Your to-do couldn't be updated at this time.</p>
                </>}
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button className="button" data-toggle="popover" title="Try Again" onClick={props.hide}>Try Again</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ErrorModal;
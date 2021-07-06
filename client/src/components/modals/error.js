import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import "./style.css";

const ErrorModal = (props) => {
  console.log(props.errMessage)
  const codeArr = props.errMessage?.split(" ");
  console.log({ codeArr });

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
                ? <>
                  <p>Your signup couldn't be processed at this time.</p>
                  {codeArr?.includes("E11000") &&
                    <p>The email you entered has already been registered.</p>}
                  {props.errMessage === "User validation failed: email: Path `email` is required." &&
                    <p>Please enter a valid email!</p>}
                  {props.errMessage === "User validation failed: password: Path `password` is required." &&
                    <p>Please enter a password!</p>}
                </>
                : <p>Your login couldn't be processed at this time.</p>}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ErrorModal;
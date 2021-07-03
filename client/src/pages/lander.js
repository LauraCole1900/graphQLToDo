import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { LoginForm } from "../components";
import { ErrorModal, SuccessModal } from "../components/modals";
import "./style.css";

const LandingPage = () => {
  const [btnName, setBtnName] = useState();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // handles button click
  const handleClick = () => {
    switch (btnName) {
      case "Sign Up":
        break;
      default:

    }
  }


  return (
    <>
      <Container>
        <Row>
          <Col sm={12} className="center">
            <h1>Welcome!</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={12} className="center">
            <h2>Please sign in or sign up to continue.</h2>
          </Col>
        </Row>
        <Row>
          <LoginForm setBtnName={setBtnName} handleClick={handleClick} />
        </Row>

        <ErrorModal show={showError === true} hide={showError === false} btnName={btnName} />

        <SuccessModal show={showSuccess === true} hide={showSuccess === false} />

      </Container>
    </>
  )
}

export default LandingPage;
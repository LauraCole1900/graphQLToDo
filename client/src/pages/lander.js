import React, { useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { LoginForm } from "../components";
import { ErrorModal, SuccessModal } from "../components/modals";
import "./style.css";

const LandingPage = () => {
  const [btnName, setBtnName] = useState();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(true);

  const handleShowError = () => setShowError(true);
  const handleHideError = () => setShowError(false);
  const handleShowSuccess = () => setShowSuccess(true);
  const handleHideSuccess = () => setShowSuccess(false);

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

        <ErrorModal show={showError === true} hide={() => handleHideError()} btnName={btnName} />

        <SuccessModal show={showSuccess === true} hide={() => handleHideSuccess()} buttonName="Login" setBtnName={setBtnName} handleClick={handleClick} />

      </Container>
    </>
  )
}

export default LandingPage;
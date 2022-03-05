import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Login } from "../components";
import { ErrorModal, SuccessModal } from "../components/modals";
import "./style.css";

const LandingPage = () => {
  const [btnName, setBtnName] = useState();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errMessage, setErrMessage] = useState();

  // Modal methods
  const handleShowError = () => setShowError(true);
  const handleHideError = () => setShowError(false);
  const handleShowSuccess = () => setShowSuccess(true);
  const handleHideSuccess = () => setShowSuccess(false);

  useEffect(() => {

  }, [showError]);


  return (
    <>
      <Container>
        <Row>
          <Col sm={12} className="center">
            <h1>Welcome to My GraphQL To-Do App!</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={12} className="center">
            <h2>Please sign in or sign up to continue.</h2>
          </Col>
        </Row>
        <Row>
          <Login setBtnName={setBtnName} handleShowError={handleShowError} handleShowSuccess={handleShowSuccess} setErrMessage={setErrMessage} />
        </Row>

        <ErrorModal show={showError === true} hide={() => handleHideError()} btnName={btnName} errMessage={errMessage} />

        <SuccessModal show={showSuccess === true} hide={() => handleHideSuccess()} buttonName="Login" setBtnName={setBtnName} setErrMessage={setErrMessage} handleShowError={handleShowError} />

      </Container>
    </>
  )
}

export default LandingPage;
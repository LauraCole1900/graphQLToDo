import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { SigninForm } from "../components";
import "./style.css";

const LoginForm = (props) => {


  return (
    <>
      <Container>

        <Row>
          <Col sm={2}></Col>
          <Col sm={4}>
            <h1>Login:</h1>
          </Col>
          <Col sm={4}>
            <h1>Sign up:</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={2}></Col>
          <Col sm={4}>
            <SigninForm setBtnName={props.setBtnName} buttonName="Login" handleShowError={props.handleShowError} handleShowSuccess={props.handleShowSuccess} setErrMessage={props.setErrMessage} />
          </Col>
          <Col sm={4}>
            <SigninForm setBtnName={props.setBtnName} buttonName="Sign Up" handleShowError={props.handleShowError} handleShowSuccess={props.handleShowSuccess} setErrMessage={props.setErrMessage} />
          </Col>
        </Row>

      </Container>
    </>
  )
}

export default LoginForm;
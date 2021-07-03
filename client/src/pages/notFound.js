import React from "react";
import { Container, Col, Row } from "react-bootstrap";

const NotFound = () => {


  return (
    <>
    <Container>
      <Row>
        <Col sm={12}>
          <h1>404 Page Not Found</h1>
          <h3>Looks like you've discovered uncharted territory! Return to mapped areas here:</h3>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default NotFound;
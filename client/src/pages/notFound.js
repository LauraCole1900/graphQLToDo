import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Col, Row } from "react-bootstrap";

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
      <Row>
        <Col sm={3}>
          <Link to="/">
            <Button data-toggle="popover" title="Sign-in Page" className="button">Sign-in Page</Button>
          </Link>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default NotFound;
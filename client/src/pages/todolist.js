import React from "react";
import { Container, Col, Row } from "react-bootstrap";

const ToDoListPage = () => {


  return (
    <>
      <Container>
        <Row>
          <Col sm={12} classname="flex flex-center">
            <h1>My To-Do List</h1>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ToDoListPage;
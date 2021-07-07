import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { ToDoForm } from "../components";
import { QUERY_USERS } from "../utils/queries";

const ToDoListPage = () => {
  // const { loading, data } = useQuery(QUERY_USERS);
  // const users = data?.users || [];

  return (
    <>
      <Container>
        <Row>
          <Col sm={12} className="center">
            <h1>My To-Do List</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <ToDoForm />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ToDoListPage;
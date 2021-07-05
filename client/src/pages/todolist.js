import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";

const ToDoListPage = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];

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
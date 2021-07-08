import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { DELETE_TODO, QUERY_ONE_TODO } from "../utils";

const ToDoCard = (props) => {


  const handleEdit = (e) => {
    e.preventDefault();
    props.setBtnName(e.target.name);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    props.setBtnName(e.target.name);

  }


  return (
    <>
      {props.toDos?.map(todo => (
        <Card className="todoCard" key={todo._id}>
          <Card.Header className="cardHeader">
            <Row>
              <Col sm={12}>
                <h2 className="cardTitle">{todo.name}</h2>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body className="cardBody">
            <Row>
              <Col sm={12}>
                <p>Due: {todo.due}</p>
                <p>Description: {todo.description}</p>
              </Col>
            </Row>
            <Row>
              <Col sm={12} className="cardBtns">
                <Button data-toggle="popover" title="Edit" name="Edit" className="button" data-todoid={todo._id} onClick={handleEdit}>Edit</Button>
                <Button data-toggle="popover" title="Delete" name="Delete" className="button" data-todoid={todo._id} onClick={handleDelete}>Delete</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

export default ToDoCard;
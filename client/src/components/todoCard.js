import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

const ToDoCard = (props) => {
  // Needs "edit" and "delete" buttons

  const handleEdit = (e) => {

  }

  const handleDelete = (e) => {

  }


  return (
    <>
    {props.toDos.map(todo => (
      <Card className="todoCard" key={todo._id}>
        <Card.Header className="cardTitle">
          <Row>
            <Col sm={8}>
              <h2>{todo.name}</h2>
            </Col>
            <Col sm={2}>
              <Button data-toggle="popover" title="Edit" className="button" onClick={handleEdit}>Edit</Button>
            </Col>
            <Col sm={2}>
              <Button data-toggle="popover" title="Delete" className="button" onClick={handleDelete}>Delete</Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body className="cardBody">
          <Row>
            <Col sm={12}>
              <p>{todo.due}</p>
              <p>{todo.description}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    ))}
    </>
  )
}

export default ToDoCard;
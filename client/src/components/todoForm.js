import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const ToDoForm = () => {
  const [newToDo, setNewToDo] = useState({
    name: "",
    description: "",
    due: ""
  });
  
  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewToDo({ ...newToDo, [name]: value })
  };


  return (
    <>
      <Row>
        <Col sm={6}>
          <Form className="todoForm">
            <Form.Group>
              <Form.Label>Name: <span className="red">*</span></Form.Label>
              <Form.Control type="input" name="name" placeholder="Name of your to-do" value={newToDo.name} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description: <span className="red">*</span></Form.Label>
              <Form.Control type="input" name="description" placeholder="Description of your to-do" value={newToDo.description} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Due:</Form.Label>
              <Form.Control type="date" name="due" placeholder="3/15/2020" value={newToDo.due} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default ToDoForm;
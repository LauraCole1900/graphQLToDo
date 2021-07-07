import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client"
import { Button, Col, Form, Row } from "react-bootstrap";
import { CREATE_TODO } from "../utils";

const ToDoForm = (props) => {
  const [newToDo, setNewToDo] = useState({
    name: "",
    description: "",
    due: ""
  });

  // GraphQL variables
  const [createToDo, { addError, addData }] = useMutation(CREATE_TODO);

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewToDo({ ...newToDo, [name]: value })
  };

  // Handles button click
  const handleButtonClick = async (e) => {
    e.preventDefault();
    props.setBtnName(e.target.name);
    try {
      const { data } = await createToDo({
        variables: { ...newToDo }
      });
      console.log({ newToDo });
      props.handleShowSuccess();
      setNewToDo({ name: "", description: "", due: "" })
    }
    catch (error) {
      console.log(JSON.stringify(error.message));
      props.setErrMessage(error.message);
      props.handleShowError();
      setNewToDo({ name: "", description: "", due: "" })
    }
  }


  return (
    <>
      <Row>
        <Col sm={12}>
          <Form className="todoForm">
            <Form.Group>
              <Form.Label>Name: <span className="red">*</span></Form.Label>
              <Form.Control type="input" name="name" placeholder="Name of your to-do" value={newToDo.name} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description: <span className="red">*</span></Form.Label>
              <Form.Control as="textarea" rows={3} name="description" placeholder="Description of your to-do" value={newToDo.description} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Due:</Form.Label>
              <Form.Control type="date" name="due" placeholder="3/15/2020" value={newToDo.due} onChange={handleInputChange} />
            </Form.Group>
          </Form>

          <Button data-toggle="popover" title="Create New To-Do" name="Create New To-Do" className="button" onClick={(e) => handleButtonClick(e)}>Create New To-Do</Button>
        </Col>
      </Row>
    </>
  )
}

export default ToDoForm;
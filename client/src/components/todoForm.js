import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Col, Form, Row } from "react-bootstrap";
import { EDIT_TODO, QUERY_MY_TODOS } from "../utils/gql";

const ToDoForm = (props) => {


  // GraphQL variables

  // Edit (Update)
  // const [editToDo, { editLoading, editError, editData }] = useMutation(EDIT_TODO);

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    props.setToDo({ ...props.toDo, [name]: value });
  };

  // Handles form submit
  const handleSubmit = async (e) => {
    console.log(props.toDo);
    e.preventDefault();
    props.setBtnName(e.target.name);
    // Runs createToDo mutation
    try {
      const { data } = await props.createToDo({
        variables: { ...props.toDo, done: false }
      });
      console.log({ data });
      // Shows success modal
      props.handleShowSuccess();
      // Resets form
      props.setToDo({ name: "", description: "", due: "" });
    }
    catch (error) {
      console.log(JSON.parse(JSON.stringify(error)));
      // Sets error message in state for use on error modal
      props.setErrMessage(error.message);
      // Shows error modal
      props.handleShowError();
      // Resets form
      props.setToDo({ name: "", description: "", due: "" });
    }
  }

  // Handles form update
  const handleUpdate = async (e) => {
    e.preventDefault();
    props.setBtnName(e.target.name);
    // Runs editToDo mutation
    try {
      const data = await props.editToDo({
        variables: { id: props.toDo._id, ...props.toDo }
      });
      console.log({ data });
      // Shows success modal
      props.handleShowSuccess();
      // Resets form
      props.setToDo({ name: "", description: "", due: "" });
    }
    catch (error) {
      // Sets error message in state for use on error modal
      props.setErrMessage(error.message);
      // Shows error modal
      props.handleShowError();
      // Resets form
      props.setToDo({ name: "", description: "", due: "" });
    }
  }

  useEffect(() => {
    // Checks which button is in state
    if (props.btnName === "Edit") {
      // If it's "edit", sets the selected to-do in state and fires rerender to populate the form
      // setToDo(initToDo)
    }
  }, [])


  return (
    <>
      <Row>
        <Col sm={12}>
          <Form className="todoForm">
            <Form.Group>
              <Form.Label>Name: <span className="red">*</span></Form.Label>
              <Form.Control type="input" name="name" placeholder="Name of your to-do" value={props.toDo.name} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description: <span className="red">*</span></Form.Label>
              <Form.Control as="textarea" rows={3} name="description" placeholder="Description of your to-do" value={props.toDo.description} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Due:</Form.Label>
              <Form.Control type="date" name="due" placeholder="3/15/2020" value={props.toDo.due} onChange={handleInputChange} />
            </Form.Group>
          </Form>

          {props.btnName === "Edit"
            ? <Button data-toggle="popover" title="Update To-Do" name="Update" className="button" onClick={(e) => handleUpdate(e)}>Update To-Do</Button>
            : <Button data-toggle="popover" title="Create New To-Do" name="Create" className="button" onClick={(e) => handleSubmit(e)}>Create New To-Do</Button>}
        </Col>
      </Row>
    </>
  )
}

export default ToDoForm;
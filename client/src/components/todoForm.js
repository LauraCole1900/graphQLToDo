import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client"
import { Button, Col, Form, Row } from "react-bootstrap";
import { CREATE_TODO, EDIT_TODO } from "../utils";

const ToDoForm = (props) => {
  const [newToDo, setNewToDo] = useState(props.toDo || {
    name: "",
    description: "",
    due: ""
  });

  // GraphQL variables
  const [createToDo, { addError, addData }] = useMutation(CREATE_TODO);
  const [editToDo, { editError, editData }] = useMutation(EDIT_TODO);

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewToDo({ ...newToDo, [name]: value })
  };

  // Handles for submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    props.setBtnName(e.target.name);
    try {
      const { addData } = await createToDo({
        variables: { ...newToDo, userId: props.urlId }
      });
      console.log({ newToDo });
      props.handleShowSuccess();
      setNewToDo({ name: "", description: "", due: "" })
      props.refetch();
    }
    catch (error) {
      console.log(JSON.stringify(error.message));
      props.setErrMessage(error.message);
      props.handleShowError();
      setNewToDo({ name: "", description: "", due: "" })
      props.refetch();
    }
  }

  // Handles form update
  // Need todo._id--from where??
  const handleUpdate = async (e) => {
    e.preventDefault();
    props.setBtnName(e.target.name)
    try {
      const { editData } = await editToDo({
        variables: { ...newToDo, userId: props.urlId }
      });
      console.log({ newToDo });
      props.handleShowSuccess();
      setNewToDo({ name: "", description: "", due: "" })
      props.refetch();
    }
    catch (error) {
      console.log(JSON.stringify(error.message));
      props.setErrMessage(error.message);
      props.handleShowError();
      setNewToDo({ name: "", description: "", due: "" })
      props.refetch();
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

          {props.btnName === "Edit"
            ? <Button data-toggle="popover" title="Update To-Do" name="Update" className="button" onClick={(e) => handleUpdate(e)}>Update To-Do</Button>
            : <Button data-toggle="popover" title="Create New To-Do" name="Create" className="button" onClick={(e) => handleSubmit(e)}>Create New To-Do</Button>}
        </Col>
      </Row>
    </>
  )
}

export default ToDoForm;
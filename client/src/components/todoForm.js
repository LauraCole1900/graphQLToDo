import React, { useState } from "react";
import { useMutation } from "@apollo/client"
import { Button, Col, Form, Row } from "react-bootstrap";
import { CREATE_TODO, EDIT_TODO } from "../utils";

const ToDoForm = (props) => {
  const [toDo, setToDo] = useState(props.toDo || {
    name: "",
    description: "",
    due: "",
    done: false
  });

  // GraphQL variables
  const [createToDo, { addError, addData }] = useMutation(CREATE_TODO);
  const [editToDo, { editError, editData }] = useMutation(EDIT_TODO);

  if (props.btnName === "Edit") {
    console.log("props.toDo", props.toDo)
  }

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setToDo({ ...toDo, [name]: value })
  };

  // Handles for submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    props.setBtnName(e.target.name);
    try {
      const { data } = await createToDo({
        variables: { ...toDo, userId: props.urlId, done: false }
      });
      console.log({ toDo });
      props.handleShowSuccess();
      setToDo({ name: "", description: "", due: "" })
      props.refetch();
    }
    catch (error) {
      console.log(JSON.stringify(error));
      props.setErrMessage(error.message);
      props.handleShowError();
      setToDo({ name: "", description: "", due: "" })
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
        variables: { ...toDo, _id: props.toDo._id }
      });
      console.log({ toDo });
      props.handleShowSuccess();
      setToDo({ name: "", description: "", due: "" })
      props.refetch();
    }
    catch (error) {
      console.log(JSON.stringify(error.message));
      props.setErrMessage(error.message);
      props.handleShowError();
      setToDo({ name: "", description: "", due: "" })
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
              <Form.Control type="input" name="name" placeholder="Name of your to-do" value={toDo.name} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description: <span className="red">*</span></Form.Label>
              <Form.Control as="textarea" rows={3} name="description" placeholder="Description of your to-do" value={toDo.description} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Due:</Form.Label>
              <Form.Control type="date" name="due" placeholder="3/15/2020" value={toDo.due} onChange={handleInputChange} />
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
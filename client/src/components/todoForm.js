import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Col, Form, Row } from "react-bootstrap";
import { CREATE_TODO, EDIT_TODO, QUERY_MY_TODOS } from "../utils";

const ToDoForm = (props) => {
  const [toDo, setToDo] = useState({
    name: "",
    description: "",
    due: "",
    done: false
  });

  // GraphQL variables
  const [createToDo, { error }] = useMutation(CREATE_TODO, {
    update(cache, { data: { createToDo } }) {
      try {
        const { toDos } = cache.readQuery({ query: QUERY_MY_TODOS });
        cache.writeQuery({
          query: QUERY_MY_TODOS,
          data: { toDos: [...toDos, createToDo] },
        })
      } catch (err) {
        console.log(JSON.stringify(err));
      }
    }
  });

  const [editToDo, { editLoading, editError, editData }] = useMutation(EDIT_TODO, {
    update(cache, { data: { editToDo } }) {
      try {
        const { toDos } = cache.readQuery({ query: QUERY_MY_TODOS });
        cache.writeQuery({
          query: QUERY_MY_TODOS,
          data: { toDos: [...toDos, editToDo] },
        })
      } catch (err) {
        console.log(JSON.stringify(err));
      }
    }
  });

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setToDo({ ...toDo, [name]: value })
  };

  // Handles form submit
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
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log({ toDo });
    props.setBtnName(e.target.name)
    try {
      const editData = await editToDo({
        variables: { id: toDo._id, ...toDo }
      });
      if (editData) {
        props.handleShowSuccess();
        setToDo({ name: "", description: "", due: "" })
        props.refetch();
      }
    }
    catch (error) {
      console.log(JSON.stringify(error.message));
      props.setErrMessage(error.message);
      props.handleShowError();
      setToDo({ name: "", description: "", due: "" })
      props.refetch();
    }
  }

  useEffect(() => {
    if (props.btnName === "Edit") {
      setToDo(props.toDo)
    }
  }, [props.toDo])


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
import React, { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, Card, Col, InputGroup, Row } from "react-bootstrap";
import { DELETE_TODO, EDIT_TODO, QUERY_ONE_TODO } from "../utils";

const ToDoCard = (props) => {
  const [deleteToDo, { loading: deleting, deleteError, deleteData }] = useMutation(DELETE_TODO);
  const [editToDo, { editError, editData }] = useMutation(DELETE_TODO);

  const [GetOneToDo, { loading, data, error }] = useLazyQuery(QUERY_ONE_TODO)
  if (loading) return null;
  if (data) {
    console.log({ data });
    props.setBtnName("Edit");
  }
  props.setToDo(data?.GetOneToDo);
  if (error) console.log(JSON.stringify(error));

  const handleCheckbox = async (e) => {
    const { dataset, value } = e.target;
    console.log("checkbox", value, dataset.todoid);
    const toDoId = dataset.todoid;
    props.setBtnName("Done")
    // Define data to be changed based on existing checkbox value
    switch (value) {
      case true:
        props.setToDo({ ...props.toDo, done: false });
        break;
      default:
        props.setToDo({ ...props.toDo, done: true });
    }
    try {
      await editToDo({
        variables: { id: toDoId, name: props.toDo.name, description: props.toDo.description, due: props.toDo.due, done: props.toDo.done }
      })
      props.handleShowSuccess();
      props.refetch();
    }
    catch (error) {
      console.log(JSON.stringify(error));
      props.setErrMessage(error.message);
      props.handleShowError();
      props.refetch();
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    const { dataset, name } = e.target;
    const toDoId = dataset.todoid
    props.setBtnName(name);
    try {
      if (deleting) return;
      await deleteToDo({
        variables: { id: toDoId }
      })
      props.handleShowSuccess();
      props.refetch();
    }
    catch (error) {
      console.log(JSON.stringify(error));
      props.setErrMessage(error.message);
      props.handleShowError();
      props.refetch();
    }
  }


  return (
    <>
      {props.toDos?.map(todo => (
        <Card className="todoCard" key={todo._id}>
          <Card.Header className="cardHeader">
            <Row>
              <Col sm={1} className="check">
                <InputGroup className="check">
                  <InputGroup.Checkbox aria-label="Done?" name="done" data-todoid={todo._id} className="checkBox" defaultChecked={todo.done === true} onChange={handleCheckbox} />
                </InputGroup>
              </Col>
              <Col sm={11}>
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
                <Button data-toggle="popover" title="Edit" name="Edit" className="button" data-todoid={todo._id} onClick={() => GetOneToDo({ variables: { id: todo._id } })}>Edit</Button>
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
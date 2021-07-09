import React, { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, Card, Col, Row } from "react-bootstrap";
import { DELETE_TODO, EDIT_TODO, QUERY_ONE_TODO } from "../utils";

const ToDoCard = (props) => {
  const [deleteToDo, { loading: deleting, deleteError, deleteData }] = useMutation(DELETE_TODO);

  const [GetOneToDo, { loading, data, error }] = useLazyQuery(QUERY_ONE_TODO)
  // props.setBtnName(name);
  if (loading) return null;
  if (data) console.log(data);
  props.setToDo(data?.GetOneToDo);
  if (error) console.log(JSON.stringify(error));
  // }

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
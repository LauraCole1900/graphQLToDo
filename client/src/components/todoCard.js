/* eslint-disable no-unused-vars */
import React from "react";
import { useMutation } from "@apollo/client";
import { Button, Card, Col, InputGroup, Row } from "react-bootstrap";
import { DELETE_TODO, QUERY_MY_TODOS } from "../utils/gql";


const ToDoCard = (props) => {

  //===============//
  //   Mutations   //
  //===============//

  // Delete
  const [deleteToDo, { loading: deleting, deleteError, deleteData }] = useMutation(DELETE_TODO, {
    update(cache, { data: { deleteToDo } }) {
      try {
        const data = cache.readQuery({ query: QUERY_MY_TODOS });
        const toDos = data?.GetMyToDos || [];
        const filteredToDos = toDos.filter(toDo => toDo._id !== deleteToDo._id);
        cache.writeQuery({
          query: QUERY_MY_TODOS,
          data: { GetMyToDos: [...filteredToDos] },
        });
      } catch (err) {
        console.log(JSON.parse(JSON.stringify(err)));
      }
    }
  });


  //===============//
  //    Methods    //
  //===============//

  // Handles click on checkbox
  const handleCheckbox = async (e, toDoId) => {
    let isThisDone;
    const { name, value } = e.target;
    JSON.parse(value) ? isThisDone = false : isThisDone = true;
    props.setToDoId(toDoId);
    props.setBtnName(name);
    try {
      await props.markDone({
        variables: { id: toDoId, done: isThisDone }
      });
    }
    catch (error) {
      console.log(JSON.parse(JSON.stringify(error)));
      props.setErrMessage(error.message);
      props.handleShowError();
    }
  };

  // Handles click on "Edit" button
  const handleEdit = async (e, toDoId) => {
    e.preventDefault();
    const { name } = e.target;
    props.setToDoId(toDoId);
    props.setBtnName(name);
    try {
      // Checks whether toDoId has set in state, then refetches GetOneToDo query
      if (props.toDoId) {
        await props.refetch();
      }
    } catch (err) {
      console.log(JSON.parse(JSON.stringify(err)));
      props.setErrMessage(err.message);
      props.handleShowError();
    }
  };

  // Handles click on "Delete" button
  const handleDelete = async (e, toDoId) => {
    e.preventDefault();
    const { name } = e.target;
    props.setBtnName(name);
    try {
      if (deleting) return;
      await deleteToDo({
        variables: { id: toDoId }
      });
      props.handleShowSuccess();
    }
    catch (error) {
      console.log(JSON.parse(JSON.stringify(error)));
      props.setErrMessage(error.message);
      props.handleShowError();
    }
  };


  return (
    <>
      {props.toDos?.map(todo => (
        <Card className="todoCard" key={todo._id}>
          <Card.Header className="cardHeader">
            <Row>
              <Col sm={2} className="check">
                <InputGroup className="check">
                  <InputGroup.Checkbox aria-label="Done?" name="Done" className="checkBox" defaultChecked={todo.done === true} value={todo.done} onChange={(e) => handleCheckbox(e, todo._id)} />
                  <InputGroup.Text>&nbsp;Done</InputGroup.Text>
                </InputGroup>
              </Col>
              <Col sm={10}>
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
                <Button data-toggle="popover" title="Edit" name="Edit" className="button" onClick={(e) => handleEdit(e, todo._id)}>Edit</Button>
                <Button data-toggle="popover" title="Delete" name="Delete" className="button" onClick={(e) => handleDelete(e, todo._id)}>Delete</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
    </>
  )
}

export default ToDoCard;
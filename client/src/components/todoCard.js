import React from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, Card, Col, InputGroup, Row } from "react-bootstrap";
import { DELETE_TODO, MARK_DONE, QUERY_MY_TODOS, QUERY_ONE_TODO } from "../utils";

const ToDoCard = (props) => {

  // GraphQL variables

  // Delete
  const [deleteToDo, { loading: deleting, deleteError, deleteData }] = useMutation(DELETE_TODO, {
    update(cache, { data: {deleteToDo}}) {
      try {
        const data = cache.readQuery({ query: QUERY_MY_TODOS });
        const toDos = data.GetMyToDos;
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

  // Checkbox
  const [markDone, { markLoading, markError, markData }] = useMutation(MARK_DONE, {
    update(cache, { data: { markDone } }) {
      try {
        const { toDos } = cache.readQuery({ query: QUERY_MY_TODOS });
        cache.writeQuery({
          query: QUERY_MY_TODOS,
          data: { toDos: [...toDos, markDone] },
        })
      } catch (err) {
        console.log(JSON.parse(JSON.stringify(err)));
      }
    }
  });

  // Edit
  const [GetOneToDo, { loading, data, error }] = useLazyQuery(QUERY_ONE_TODO)

  // Handles click on checkbox
  const handleCheckbox = async (e, toDoId) => {
    let isThisDone;
    const { name, value } = e.target;
    // Sets boolean based on current checkbox value
    switch (value) {
      case "true":
        isThisDone = false;
        break;
      default:
        isThisDone = true;
    }
    // Sets button name to "Done"
    props.setBtnName(name)
    // Runs markDone mutation
    try {
      await markDone({
        variables: { id: toDoId, done: isThisDone }
      })
      // Shows success modal
      props.handleShowSuccess();
    }
    catch (error) {
      console.log(JSON.parse(JSON.stringify(error)));
      // Sets error message in state for use on error modal
      props.setErrMessage(error.message);
      // Shows error modal
      props.handleShowError();
    }
  }
  if (error) return error;

  // Handles click on "Edit" button
  const handleEdit = async (e, toDoId) => {
    e.preventDefault();
    const { name } = e.target;
    // Runs GetOneToDo query
    GetOneToDo({ variables: { id: toDoId } });
    if (loading) return null;
    if (data) {
      // Sets button name to "Edit"
      props.setBtnName(name);
      // Sets current to-do to query response
      props.setToDo(data?.GetOneToDo);
      return data.GetOneToDo;
    }
    if (error) console.log(JSON.parse(JSON.stringify(error)));
  }

  // Handles click on "Delete" button
  const handleDelete = async (e, toDoId) => {
    e.preventDefault();
    const { name } = e.target;
    // Sets button name to "Delete"
    props.setBtnName(name);
    // Runs deleteToDo mutation
    try {
      if (deleting) return;
      await deleteToDo({
        variables: { id: toDoId }
      });
      // Shows success modal
      props.handleShowSuccess();
    }
    catch (error) {
      console.log(JSON.parse(JSON.stringify(error)));
      // Sets error message in state for use on error modal
      props.setErrMessage(error.message);
      // Shows error modal
      props.handleShowError();
    }
  }


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
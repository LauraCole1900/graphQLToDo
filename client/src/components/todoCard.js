import React, { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Button, Card, Col, InputGroup, Row } from "react-bootstrap";
import { DELETE_TODO, MARK_DONE, QUERY_MY_TODOS, QUERY_ONE_TODO } from "../utils";

const ToDoCard = (props) => {
  const [deleteToDo, { loading: deleting, deleteError, deleteData }] = useMutation(DELETE_TODO);

  // const [editToDo, { editLoading, editError, editData }] = useMutation(EDIT_TODO, {
  //   update(cache, { data: { editToDo } }) {
  //     try {
  //       const { toDos } = cache.readQuery({ query: QUERY_MY_TODOS });
  //       cache.writeQuery({
  //         query: QUERY_MY_TODOS,
  //         data: { toDos: [...toDos, editToDo] },
  //       })
  //     } catch (err) {
  //       console.log(JSON.stringify(err));
  //     }
  //   }
  // });

  const [markDone, { markLoading, markError, markData }] = useMutation(MARK_DONE, {
    update(cache, { data: { markDone } }) {
      try {
        const { toDos } = cache.readQuery({ query: QUERY_MY_TODOS });
        cache.writeQuery({
          query: QUERY_MY_TODOS,
          data: { toDos: [...toDos, markDone] },
        })
      } catch (err) {
        console.log(JSON.stringify(err));
      }
    }
  });
  // if (editLoading) return null;
  // if (editData) return editData;
  // if (editError) console.log(JSON.stringify(editError));
  // props.setBtnName("Done");

  const [GetOneToDo, { loading, data, error }] = useLazyQuery(QUERY_ONE_TODO)
  // if (loading) return null;
  // if (data) {
  //   console.log({ data });
  //   props.setBtnName("Edit");
  //   return data
  // }
  // props.setToDo(data?.GetOneToDo);
  // if (error) console.log(JSON.stringify(error));

  // Define data to be changed based on existing checkbox value
  // const setCheck = (value) => {
  //   switch (value) {
  //     case true:
  //       props.setToDo({ ...props.toDo, done: false });
  //       break;
  //     default:
  //       props.setToDo({ ...props.toDo, done: true });
  //   }
  // }

  const handleCheckbox = async (e) => {
    const { dataset, name, value } = e.target;
    let thisIsDone;
    console.log("checkbox", value, dataset.todoid);
    const toDoId = dataset.todoid;
    switch (value) {
      case "true":
        thisIsDone = false;
        break;
      default:
        thisIsDone = true;
    }
    // let thisToDo = await handleGetOne(e);
    // console.log({ thisToDo })
    // if (thisToDo) {
      // switch (value) {
      //   case true:
      //     thisToDo = { ...thisToDo, done: false };
      //     break;
      //   default:
      //     thisToDo = { ...thisToDo, done: true };
      // }
      // console.log({ thisToDo });
      props.setBtnName(name)
      try {
        await markDone({
          variables: { id: toDoId, done: thisIsDone }
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
    // }
  }
  if (error) return error;

  const handleGetOne = async (e) => {
    e.preventDefault();
    const { dataset, name } = e.target;
    const toDoId = dataset.todoid;
    await GetOneToDo({ variables: { id: toDoId } });
    if (loading) return null;
    if (data) {
      console.log({ data });
      props.setBtnName(name);
      // props.setToDo(data?.GetOneToDo);
      return data.GetOneToDo;
    }
    if (error) console.log(JSON.stringify(error));
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
              <Col sm={2} className="check">
                <InputGroup className="check">
                  <InputGroup.Checkbox aria-label="Done?" name="Done" data-todoid={todo._id} className="checkBox" defaultChecked={todo.done === true} value={todo.done} onChange={(e) => handleCheckbox(e)} />
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
                <Button data-toggle="popover" title="Edit" name="Edit" className="button" data-todoid={todo._id} onClick={(e) => handleGetOne(e)}>Edit</Button>
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
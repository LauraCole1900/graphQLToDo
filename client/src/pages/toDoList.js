import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { ToDoCard, ToDoForm } from "../components";
import { ErrorModal, SuccessModal } from "../components/modals";
import { QUERY_MY_TODOS, ToDoProvider } from "../utils";
import Auth from "../utils/auth";

const ToDoListPage = () => {
  const [toDo, setToDo] = useState();
  const [btnName, setBtnName] = useState();
  const [errMessage, setErrMessage] = useState();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Modal methods
  const handleShowError = () => setShowError(true);
  const handleHideError = () => setShowError(false);
  const handleShowSuccess = () => setShowSuccess(true);
  const handleHideSuccess = () => setShowSuccess(false);

  useEffect(() => {

  }, [toDo, showSuccess]);

  // GraphQL variables

  // Query to-dos by user ID
  const { loading, data } = useQuery(QUERY_MY_TODOS);
  const todoArr = data?.GetMyToDos || [];
  const arrToSort = [...todoArr];
  const sortedToDos = arrToSort.sort((a, b) => (a.due > b.due) ? 1 : -1);


  return (
    <>
      <Container>

        {loading === true &&
          <Row>
            <Col sm={12}>
              <h1>Loading....</h1>
            </Col>
          </Row>}

        <Row>
          <Col sm={2}></Col>
          <Col sm={8} className="center">
            <h1>My To-Do List</h1>
          </Col>
          <Col sm={2} className="right">
            <Button data-toggle="popover" title="Logout" name="Logout" className="button" onClick={Auth.logout}>Logout</Button>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <ToDoForm setBtnName={setBtnName} handleShowSuccess={handleShowSuccess} handleShowError={handleShowError} setErrMessage={setErrMessage} btnName={btnName} toDo={toDo} />
          </Col>

          <Col sm={6}>
            <ToDoCard toDos={sortedToDos} setErrMessage={setErrMessage} handleShowError={handleShowError} handleShowSuccess={handleShowSuccess} btnName={btnName} setBtnName={setBtnName} toDo={toDo} setToDo={setToDo} />
          </Col>
        </Row>

        <ErrorModal show={showError === true} hide={() => handleHideError()} btnName={btnName} errMessage={errMessage} />

        <SuccessModal show={showSuccess === true} hide={() => handleHideSuccess()} btnName={btnName} setBtnName={setBtnName} />

      </Container>
    </>
  )
}

export default ToDoListPage;
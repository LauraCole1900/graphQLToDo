import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { ToDoCard, ToDoForm } from "../components";
import { ErrorModal, SuccessModal } from "../components/modals";
import { QUERY_MY_TODOS } from "../utils/queries";

const ToDoListPage = () => {
  const history = useHistory();
  const [btnName, setBtnName] = useState();
  const [errMessage, setErrMessage] = useState();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Pull userId from URL
  const urlArray = window.location.href.split("/")
  const urlId = urlArray[urlArray.length - 1]

  // Modal variables
  const handleShowError = () => setShowError(true);
  const handleHideError = () => setShowError(false);
  const handleShowSuccess = () => setShowSuccess(true);
  const handleHideSuccess = () => setShowSuccess(false);

  const returnToSignin = () => {
    history.push("/");
  }

  // GraphQL variables
  const { loading, error, data, refetch } = useQuery(QUERY_MY_TODOS, {
    variables: { userId: urlId }
  });
  if (loading) return null;
  const todoArr = data?.GetMyToDos;
  const arrToSort = [...todoArr];
  const sortedToDos = arrToSort.sort((a, b) => (a.due > b.due) ? 1 : -1)
  console.log({ urlId }, { todoArr }, { sortedToDos });


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
            <Button data-toggle="popover" title="Logout" name="Logout" className="button" onClick={returnToSignin}>Logout</Button>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <ToDoForm setBtnName={setBtnName} handleShowSuccess={handleShowSuccess} handleShowError={handleShowError} setErrMessage={setErrMessage} urlId={urlId} refetch={() => refetch()} />
          </Col>

          <Col sm={6}>
            <ToDoCard toDos={sortedToDos} refetch={() => refetch()} />
          </Col>
        </Row>

        <ErrorModal show={showError === true} hide={() => handleHideError()} btnName={btnName} errMessage={errMessage} />

        <SuccessModal show={showSuccess === true} hide={() => handleHideSuccess()} buttonName="Create New To-Do" setBtnName={setBtnName} />

      </Container>
    </>
  )
}

export default ToDoListPage;
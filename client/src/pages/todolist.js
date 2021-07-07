import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { ToDoCard, ToDoForm } from "../components";
import { ErrorModal, SuccessModal } from "../components/modals";
import { QUERY_MY_TODOS } from "../utils/queries";

const ToDoListPage = () => {
  const [btnName, setBtnName] = useState();
  const [errMessage, setErrMessage] = useState();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Pull userId from URL
  const urlArray = window.location.href.split("/")
  const urlId = urlArray[urlArray.length - 1]

  // GraphQL variables
  const { loading, error, data } = useQuery(QUERY_MY_TODOS, {
    variables: { userId: urlId }
  });
  const todoArr = data.GetMyToDos;
  console.log({ urlId }, { todoArr });

  const handleShowError = () => setShowError(true);
  const handleHideError = () => setShowError(false);
  const handleShowSuccess = () => setShowSuccess(true);
  const handleHideSuccess = () => setShowSuccess(false);

  useEffect(() => {

  }, [data, showError]);

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
          <Col sm={12} className="center">
            <h1>My To-Do List</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <ToDoForm setBtnName={setBtnName} handleShowSuccess={handleShowSuccess} handleShowError={handleShowError} setErrMessage={setErrMessage} urlId={urlId} />
          </Col>

          <Col sm={6}>
            <ToDoCard toDos={todoArr} />
          </Col>
        </Row>

        <ErrorModal show={showError === true} hide={() => handleHideError()} btnName={btnName} errMessage={errMessage} />

        <SuccessModal show={showSuccess === true} hide={() => handleHideSuccess()} buttonName="Create New To-Do" setBtnName={setBtnName} />

      </Container>
    </>
  )
}

export default ToDoListPage;
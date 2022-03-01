import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Col, Form, Row } from "react-bootstrap"
import { ADD_USER, QUERY_ONE_USER } from "../utils";
import "./style.css";

const SigninForm = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const history = useHistory();

  // GraphQL variables
  const email = user.email;

  // Add new user
  const [addUser, { addError, addData }] = useMutation(ADD_USER);

  // Query one user
  const { loading, error, data, refetch } = useQuery(QUERY_ONE_USER,
    { variables: { email } });

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handles button click
  const handleButtonClick = async (e) => {
    e.preventDefault();
    // Sets button name in state
    props.setBtnName(props.buttonName);
    switch (props.buttonName) {
      case "Sign Up":
        // Runs addUser mutation
        try {
          const { data } = await addUser({
            variables: { ...user }
          });
          // Shows success modal
          props.handleShowSuccess();
          // Resets form
          setUser({ email: "", password: "" });
        }
        catch (error) {
          console.log(JSON.stringify(error.message));
          // Sets error message in state for use on error modal
          props.setErrMessage(error.message);
          // Shows error modal
          props.handleShowError();
          // Resets form
          setUser({ email: "", password: "" });
        }
        break;
        default:
          // Uses information from the GetOneUser query
          try {
          refetch();
          const authUser = data.GetOneUser || {};
          // If authenticated user exists
          if (Object.keys(authUser).length) {
            // and the email and password match what's in the database document
            if (authUser.email === user.email && authUser.password === user.password) {
              // push to that user's to-dos page
              history.push(`/mytodos/${authUser._id}`);
            // If email matches something in the database but the password doesn't match
            } else if (authUser.email === user.email && authUser.password !== user.password) {
              // set "Incorrect password" in state
              props.setErrMessage("Incorrect password");
              // and show the error modal
              props.handleShowError();
            }
          } else {
            throw Error;
          }
        }
        catch (error) {
          console.log(JSON.stringify(error.message));
          // Sets error message in state for use on error modal
          props.setErrMessage(error.message);
          // Shows error modal
          props.handleShowError();
        }
    }
  }


  return (
    <>
      <Form className="signupForm">
        <Row>
          <Col sm={12}>
            <h1>{props.buttonName}:</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Form.Group>
              <Form.Label>Email: <span className="red">*</span></Form.Label>
              <Form.Control type="email" name="email" placeholder="name@email.com" value={user.email} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password: <span className="red">*</span></Form.Label>
              <Form.Control type="password" name="password" placeholder="password" value={user.password} onChange={handleInputChange} />
            </Form.Group>

            <div className="right">
              <Button data-toggle="popover" title={props.buttonName} className="button " onClick={(e) => handleButtonClick(e)}>{props.buttonName}</Button>
            </div>

          </Col>
        </Row>
      </Form>
    </>
  )

}

export default SigninForm;
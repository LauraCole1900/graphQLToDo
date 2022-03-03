import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Button, Col, Form, Row } from "react-bootstrap"
import { ADD_USER, LOGIN } from "../utils/gql";
import Auth from '../utils/auth';
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

  // Login user
  const [login, { error }] = useMutation(LOGIN);

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
          const { data } = await login({
            variables: { ...user },
          });
          console.log({ data });
          Auth.login(data.login.token);
          history.push(`/mytodos`);
        } catch (error) {
          console.log(JSON.parse(JSON.stringify(error)));
          // Sets error message in state for use on error modal
          props.setErrMessage(error.message);
          // Shows error modal
          props.handleShowError();
          setUser({ email: "", password: "" });
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
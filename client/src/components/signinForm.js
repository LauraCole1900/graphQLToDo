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
  const [addUser, { addError, addData }] = useMutation(ADD_USER);
  const { loading, error, data } = useQuery(QUERY_ONE_USER,
    { variables: { email } });

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  };

  // Handles button click
  const handleButtonClick = async (e) => {
    e.preventDefault();
    props.setBtnName(props.buttonName);
    switch (props.buttonName) {
      case "Sign Up":
        try {
          const { data } = await addUser({
            variables: { ...user }
          });
          console.log({ user });
          props.handleShowSuccess();
          setUser({ email: "", password: "" })
        }
        catch (error) {
          console.log(JSON.stringify(error.message));
          props.setErrMessage(error.message);
          props.handleShowError();
          setUser({ email: "", password: "" })
        }
        break;
      default:
        try {
          const authUser = data.GetOneUser || {};
          console.log({ authUser })
          if (Object.keys(authUser).length) {
            if (authUser.email === user.email && authUser.password === user.password) {
              history.push(`/mytodos/${authUser._id}`)
            } else if (authUser.email === user.email & authUser.password !== user.password) {
              props.setErrMessage("Incorrect password")
              props.handleShowError();
            }
          } else {
            throw Error;
          }
        }
        catch (error) {
          console.log(JSON.stringify(error.message))
          props.setErrMessage(error.message);
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
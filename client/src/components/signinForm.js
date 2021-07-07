import React, { useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Col, Form, Row } from "react-bootstrap"
import { ADD_USER, QUERY_ONE_USER, QUERY_USERS } from "../utils";
import "./style.css";

const SigninForm = (props) => {
  // const params = useParams();
  // console.log({ params });
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const email = user.email;
  const [addUser, { addError, addData }] = useMutation(ADD_USER);
  const { loading, error, data } = useQuery(QUERY_ONE_USER,
    { variables: { email } });
  const history = useHistory();

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
        }
        catch (error) {
          console.log(JSON.stringify(error.message));
          props.setErrMessage(error.message);
          props.handleShowError();
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
      <Row>
        <Col sm={12}>
          <Form className="signupForm">
            <Form.Group>
              <Form.Label>Email: <span className="red">*</span></Form.Label>
              <Form.Control type="email" name="email" placeholder="name@email.com" value={user.email} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password: <span className="red">*</span></Form.Label>
              <Form.Control type="password" name="password" placeholder="password" value={user.password} onChange={handleInputChange} />
            </Form.Group>
          </Form>

          <Button data-toggle="popover" title={props.buttonName} className="button" onClick={(e) => handleButtonClick(e)}>{props.buttonName}</Button>

        </Col>
      </Row>
    </>
  )

}

export default SigninForm;
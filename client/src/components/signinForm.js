import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Col, Form, Row } from "react-bootstrap"
import { ADD_USER } from "../utils/mutations";
import "./style.css";

const SigninForm = (props) => {
  const [addUser, { error }] = useMutation(ADD_USER);
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
  };

  // Handles button click
  const handleButtonClick = async (e) => {
    e.preventDefault();
    props.setBtnName(props.buttonName)
    switch (props.buttonName) {
      case "Sign Up":
        console.log(props.buttonName);
        console.log({ user })
        try {
          const { data } = await addUser({
            variables: { user }
          });
          window.location.reload();
        }
        catch (err) {
          props.handleShowError();
          console.log(err);
        }
        history.push(`/mytodos`)
        break;
      default:

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
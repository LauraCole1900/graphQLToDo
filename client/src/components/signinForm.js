import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap"
import "./style.css";

const SigninForm = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  // Handles input changes to form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ [name]: value })
  };

  // Handles button click
  const handleButtonClick = (e) => {
    e.preventDefault();
    props.setBtnName(props.buttonName)
    props.handleClick();
  }


  return (
    <>
      <Row>
        <Col sm={12}>
          <Form className="signupForm">
            <Form.Group>
              <Form.Label>Email: <span className="red">*</span></Form.Label>
              <Form.Control type="email" name="userEmail" placeholder="name@email.com" value={user.userEmail} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password: <span className="red">*</span></Form.Label>
              <Form.Control type="password" name="userPassword" placeholder="password" value={user.userPassword} onChange={handleInputChange} />
            </Form.Group>
          </Form>

          <Button className="button" onClick={(e) => handleButtonClick(e)}>{props.buttonName}</Button>

        </Col>
      </Row>
    </>
  )

}

export default SigninForm;
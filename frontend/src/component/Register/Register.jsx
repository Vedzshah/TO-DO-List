import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
const Register = () => {
  const [username, setUserName] = useState("");
  const [password , setPassword] = useState("");
  const [name, setName] = useState("");
  const [contact , setContact] = useState("");
  const [email, setEmail] = useState("");
  const [position , setPosition] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault ();
    try{
      if(username === "" || password === "" || name === "" || email === "" || contact === "" || position === ""){
        alert("Please enter all details");
        return;
      }
      const response = await axios.post(`${process.env.REACT_APP_API_URL}register`,
        {
          username: username, password: password, contact: contact, email: email, name: name, position: position
        });
      if(response.status === 200){
        alert("User Created Successfully");
        window.location.href = "/";
      }
    }catch(error){
      console.log (error);
    }
  };
  const handleButton = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <Card>
            <Card.Header className="text-center">
              <h3>Register</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit = {handleSubmit}>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" onChange = {(e) => setName(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter Username" onChange = {(e) => setUserName(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formBasicContact">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control type="number" placeholder="Enter contact number" onChange = {(e) => setContact(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange = {(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" onChange = {(e) => setPassword(e.target.value)}  required />
                </Form.Group>
                <Form.Group controlId="formBasicEmployeeType">
                  <Form.Label>Employee Type</Form.Label>
                  <Form.Control as="select" onChange = {(e) => setPosition(e.target.value)} required>
                    <option value="">Select employee type</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </Form.Control>
                </Form.Group>
                <div className='buttonHolder'>
                  <Button variant="primary" type="submit" >
                    Register
                  </Button>
                  <Button variant="primary" type="button" onClick={handleButton} >
                    Sign In
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;

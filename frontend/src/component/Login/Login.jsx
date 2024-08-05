import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUserName] = useState("");
  const [password , setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault ();
    try{
      if(username === "" || password === ""){
        alert("Please enter all details");
        return;
      }
      const response = await axios.post(`${process.env.REACT_APP_API_URL}login`,{username: username, password: password});
      let token = response.data.token;
      localStorage.setItem("token", token);
      let position = response.data.position;
      localStorage.setItem("position", position);
      let userId = response.data.id;
      localStorage.setItem("userId", userId);
      if(response.status === 200){
        if(position === "admin"){
          window.location.href = "/admindashboard";
        }else{
          window.location.href = "/userdashboard";
        }
      }
    }catch(error){
      console.log (error);
      if(error.response.data.error === "Invaild credenial"|| error.response.data.error === "Failed to : User Doesn't Exists" ){
        alert("Invaild credenial");
      }
    }
  };
  const handleButton = (e) => {
    e.preventDefault();
    window.location.href = "/register";
  };
  return (
    <Container>
      <Row className="justify-content-center">
        <Col>
          <Card>
            <Card.Header className="text-center">
              <h3>Login</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit = {handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter Username" onChange = {(e) => setUserName(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange = {(e) =>setPassword(e.target.value) } required />
                </Form.Group>
                <div className='buttonHolder'>
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                  <Button variant="primary" type="button" onClick={handleButton} >
                    Register
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

export default Login;

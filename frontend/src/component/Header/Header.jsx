import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { Navbar, Nav } from 'react-bootstrap';
import Logo from '../../asset';  
import axios from 'axios';

const Header = () => {
  const position = localStorage.getItem("position");
  const path = position === 'admin' ? '/admindashboard' : '/userdashboard';
  const handleLogout = async (e) => {
    e.preventDefault ();
    try{
      const response = await axios.post(`${process.env.REACT_APP_API_URL}logout`);
      localStorage.removeItem("token");
      if(response.status === 200){
        window.location.href = "/";
      }
    }catch(error){
      console.log (error);
    }
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home" className="d-flex align-items-center">
        <img
          src={Logo}
          width="40"
          height="40"
          className="d-inline-block align-top"
          alt="Logo"
        />
        <span className="ml-2">AppName</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>

          <Nav.Link href={path}>Dashboard</Nav.Link>
          <Nav.Link href="#profile">Profile</Nav.Link>
          <Nav.Link href="#logout" onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

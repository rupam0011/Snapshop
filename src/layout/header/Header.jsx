// Header.js
import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import snapshop from "../../assets/Snapshop.png";
import "./Header.css";

const Header = () => {
 
 const navigate=useNavigate()
  return (
    <Navbar className={"navbarStyle"} variant="dark" expand="lg">
      <Container fluid className="d-flex nav-container">
        <Navbar.Brand as={Link} to="" className="navbar-brand">
          SnapShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="text">
            {/* <Nav.Link className='links' as={Link} to="">Home</Nav.Link> */}
            <Nav.Link className="links" as={Link} to="">
              Services
            </Nav.Link>
            <Nav.Link className="links" as={Link} to="">
              About us
            </Nav.Link>
            <Nav.Link className="links" as={Link} to="">
              Need help?
            </Nav.Link>
            <Nav.Link className="links" as={Link} to="products">
              Shop
            </Nav.Link>
            {window.sessionStorage.getItem("token") ? (
              <Nav.Link className="links" onClick={()=>{
                window.sessionStorage.removeItem("token");
                navigate("/login")
              }}>
                Sign Out
              </Nav.Link>
            ) : (
              <Nav.Link className="links" as={Link} to="login">
                Sign In
              </Nav.Link>
            )}{" "}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

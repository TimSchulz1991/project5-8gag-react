import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from '../styles/NavBar.module.css'


const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top" variant="dark" className={styles.NavBar}>
      <Container >
        <Navbar.Brand>
          <h1 className="mb-0">8GAG</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-md-auto text-center">
            <Nav.Link>
              Home
            </Nav.Link>
            <Nav.Link>
              Sign In
            </Nav.Link>
            <Nav.Link>
              Sign Up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
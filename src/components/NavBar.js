import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from '../styles/NavBar.module.css'


const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top" className={styles.NavBar}>
      <Container >
        <Navbar.Brand className={styles.Brand}>
          <h1 >8GAG</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <Nav.Link>
              Home
            </Nav.Link>
            <Nav.Link>
              Sign in
            </Nav.Link>
            <Nav.Link>
              Sign up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from '../styles/NavBar.module.css'


const NavBar = () => {
  return (
    <Navbar expand="md" fixed="top" variant="dark">
      <Container >
        <Navbar.Brand className={styles.NavColor}>
          <h1 >8GAG</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-md-auto text-center">
            <Nav.Link>
              <span>Home</span>
            </Nav.Link>
            <Nav.Link>
              <span>Sign In</span>
            </Nav.Link>
            <Nav.Link>
              <span>Sign Up</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
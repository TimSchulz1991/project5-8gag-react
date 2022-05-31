import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../context/CurrentUserContext";

const NavBar = () => {
    const currentUser = useCurrentUser();

    const loggedInIcons = <>{currentUser?.username}</>;
    const loggedOutIcons = (
        <>
            <NavLink
                className="ml-3"
                activeClassName={styles.Active}
                to="/signin"
            >
                Sign In
            </NavLink>
            <NavLink
                className="ml-3"
                activeClassName={styles.Active}
                to="/signup"
            >
                Sign Up
            </NavLink>
        </>
    );

    return (
        <Navbar
            expand="md"
            fixed="top"
            variant="dark"
            className={styles.NavBar}
        >
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>
                        <h1 className="mb-0">8GAG</h1>
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-md-auto text-center">
                        <NavLink
                            exact
                            className="ml-3"
                            activeClassName={styles.Active}
                            to="/"
                        >
                            Home
                        </NavLink>
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;

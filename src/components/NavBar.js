import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import btnStyles from "../styles/Button.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../context/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import { useSetCurrentUser } from "../context/CurrentUserContext";

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const handleSignOut = async () => {
        try {
          await axios.post("dj-rest-auth/logout/");
          setCurrentUser(null);
        //   removeTokenTimestamp();
        } catch (err) {
          console.log(err);
        }
      };

    const addPostIcon = (
        <NavLink
            to="/posts/create"
            className={`${btnStyles.Button} ${btnStyles.Bright}`}
        >
            Create new post
        </NavLink>
    );

    const loggedInIcons = (
        <>
            <NavLink
                className="ml-3 my-auto p-1"
                activeClassName={styles.Active}
                to="/liked"
            >
                Liked
            </NavLink>
            <NavLink className="ml-3 my-auto p-1" to="/" onClick={handleSignOut}>
                Sign out
            </NavLink>
            <NavLink
                className="ml-3 my-auto p-1"
                to={`/profiles/${currentUser?.profile_id}`}
            >
                <Avatar
                    src={currentUser?.profile_image}
                    text="Profile"
                    height={40}
                />
            </NavLink>
        </>
    );
    const loggedOutIcons = (
        <>
            <NavLink
                className="ml-3 my-auto p-1"
                activeClassName={styles.Active}
                to="/signin"
            >
                Sign In
            </NavLink>
            <NavLink
                className="ml-3 my-auto p-1"
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
                {currentUser && addPostIcon}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-md-auto text-center">
                        <NavLink
                            exact
                            className="ml-3 my-auto p-1"
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

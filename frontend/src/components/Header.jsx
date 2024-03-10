import React from "react";
import { Nav, NavDropdown, NavLink } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

import styles from "./styles/Header.module.css";
import Logo from "./Logo";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className={styles.nav}>
      <ul>
        <Logo />
        <li>
          <LinkContainer to="/">
            <NavLink>Home</NavLink>
          </LinkContainer>
        </li>
        <li>
          <LinkContainer to="/news">
            <NavLink>News</NavLink>
          </LinkContainer>
        </li>
        <li>
          <LinkContainer to="/about">
            <NavLink>About</NavLink>
          </LinkContainer>
        </li>
      </ul>
      <ul>
        {userInfo ? (
          <li>
            <figure
              className="avatar avatar-nav"
              style={{ marginRight: "-25px" }}
            >
              <img
                src={userInfo.image}
                alt={userInfo && userInfo.name}
                className="rounded-circle"
              />
            </figure>
          </li>
        ) : (
          <li>
            <LinkContainer to="/login">
              <Nav.Link className={styles.ctaLink}>Log In</Nav.Link>
            </LinkContainer>
          </li>
        )}
        {userInfo && (
          <li>
            <NavDropdown title={userInfo.name} id="username">
              <LinkContainer
                to="/profile"
                style={{
                  color:
                    window.location.pathname === "/profile"
                      ? "#00c46a"
                      : "black",
                }}
              >
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <br />
              <LinkContainer
                to="/myreports"
                style={{
                  color:
                    window.location.pathname === "/myreports"
                      ? "#00c46a"
                      : "black",
                }}
              >
                <NavDropdown.Item>My Reports</NavDropdown.Item>
              </LinkContainer>
              <br />
              <NavDropdown.Item
                onClick={logoutHandler}
                style={{ color: "red" }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </li>
        )}
        {userInfo && userInfo.isAdmin && (
          <li>
            <NavDropdown title="Admin" id="adminMenu">
              <LinkContainer
                style={{
                  color:
                    window.location.pathname === "/admin/users"
                      ? "#00c46a"
                      : "black",
                }}
                to="/admin/users"
              >
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer
                style={{
                  color:
                    window.location.pathname === "/admin/reports"
                      ? "#00c46a"
                      : "black",
                }}
                to="/admin/reports"
              >
                <NavDropdown.Item>Reports</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer
                style={{
                  color:
                    window.location.pathname === "/admin/charts"
                      ? "#00c46a"
                      : "black",
                }}
                to="/admin/charts"
              >
                <NavDropdown.Item>Charts</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;

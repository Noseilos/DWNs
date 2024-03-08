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
      </ul>
      <ul>
        {userInfo ? (
          <li>
            <figure className="avatar avatar-nav">
              <img
                src={userInfo.image[0]}
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
              <LinkContainer to="/profile" style={{ color: "black" }}>
                <NavDropdown.Item>Profile</NavDropdown.Item>
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
              <LinkContainer style={{ color: "black" }} to="/admin/users">
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer style={{ color: "black" }} to="/admin/products">
                <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer style={{ color: "black" }} to="/admin/categories">
                <NavDropdown.Item>Categories</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer style={{ color: "black" }} to="/admin/brands">
                <NavDropdown.Item>Brands</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer style={{ color: "black" }} to="/admin/orders">
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;

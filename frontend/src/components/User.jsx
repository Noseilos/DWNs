import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../utils/helpers";
import { useDispatch } from "react-redux";
import styles from "./styles/User.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";

function User() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutUser = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  const logoutHandler = () => {
    logoutUser();
    // toast.success("Logged out", {
    //   position: toast.POSITION.BOTTOM_RIGHT,
    // });
    setTimeout(() => {
      window.location.reload();
    }, 0);
  };

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <Link to="/" className={styles.button}>
        <button className={styles.button} onClick={logoutHandler}>
          Logout
        </button>
      </Link>
    </div>
  );
}

export default User;
import { Link, useNavigate } from "react-router-dom";
import { logout, getUser } from "../utils/helpers";
import styles from "./styles/User.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

function User() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await axios.get(`http://localhost:3000/api/v1/logout`);
      setUser({});
      logout(() => navigate("/"));
    } catch (error) {
      // toast.error(error.response?.data?.message || "An error occurred");
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

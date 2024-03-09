import { Link } from "react-router-dom";
import styles from "./styles/User.module.css";
import { useSelector } from "react-redux";

function User() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className={styles.user}>
      <img src={userInfo.image[0]} alt={userInfo.name} />
      <span>Welcome, {userInfo.name}</span>
      <Link to="/" className={styles.button}>
        <button className={styles.button}>Home</button>
      </Link>
    </div>
  );
}

export default User;

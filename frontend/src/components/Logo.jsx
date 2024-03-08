import { Link } from "react-router-dom";
import styles from "./styles/Logo.module.css";
import img from "../assets/new.png";
function Logo() {
  return (
    <Link to="/">
      <img src={img} alt="DWN Logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;

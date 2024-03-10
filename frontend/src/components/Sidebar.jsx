import { Outlet } from "react-router-dom";
import styles from "./styles/Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Outlet/>
    </div>
  );
}

export default Sidebar;

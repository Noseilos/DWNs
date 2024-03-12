import Header from "../components/Header";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import User from "../components/User";
import styles from "./styles/AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app2}>
      <Header />

      <div className={styles.app}>
        <Sidebar />
        <Map />
      </div>
    </div>
  );
}

export default AppLayout;

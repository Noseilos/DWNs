import React from "react";
import { Link } from "react-router-dom";
import img from "../assets/dwn.png";
import { useSelector } from "react-redux";
import styles from "./styles/Homepage.module.css";
import Header from "../components/Header";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <section className={styles.homepage}>
        <Header />
        <div>
          <img src={img} alt="DWN Logo" className={styles.logo} />
          <h1>Dynamic Waste Navigations</h1>
        </div>
        <Link to="/app">
          <button className={styles.start_btn}>Get Started</button>
        </Link>
      </section>
      <div></div>
    </>
  );
};

export default HomeScreen;

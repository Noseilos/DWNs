import React from "react";

// --- COMPONENT IMPORTS ---
import Header from "./components/Header";
import Footer from "./components/Footer";

// --- STYLE IMPORTS ---
import styles from "./screens/styles/Homepage.module.css";

// --- PACKAGE IMPORTS ---
import { Outlet, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const location = useLocation(); // Get the current location using useLocation hook

  // Determine the className based on the current location
  let mainClassName;
  if (location.pathname === "/news") {
    mainClassName = styles.news; // Apply style for the about page
  } else if (location.pathname === "/login") {
    mainClassName = styles.login; // Apply style for the about page
  } else {
    mainClassName = styles.homepage;
  }
  return (
    <>
        <Outlet />
      <Footer />
    </>
  );
};

export default App;

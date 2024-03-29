import React from "react";

// --- COMPONENT IMPORTS ---
import Footer from "./components/Footer";

// --- PACKAGE IMPORTS ---
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "mapbox-gl/dist/mapbox-gl.css";

const App = () => {
  return (
    <>
      <Outlet />
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;

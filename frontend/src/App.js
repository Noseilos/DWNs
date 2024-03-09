import React from 'react'

// --- COMPONENT IMPORTS ---
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'

// --- STYLE IMPORTS ---
import { Container } from 'react-bootstrap'
import styles from "./screens/styles/Homepage.module.css";

// --- PACKAGE IMPORTS ---
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  return (
    <>
      <main className={styles.homepage}>
        <Header/>
            <Outlet />
        <ToastContainer />
      </main>
        <Footer />
    </>
  )
}

export default App
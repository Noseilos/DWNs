import React, { useState } from "react";
import { useDispatch } from "react-redux"; // Importing useDispatch hook
import axios from "axios";
import { setCredentials } from "./../slices/authSlice"; // Importing the action creator from the authSlice
import styles from "./styles/Login.module.css";
import Header from "../components/Header";
import FormContainer from "../components/FormContainer";
import { Divider } from "@mui/material";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users/forgotpassword", { email });
      setMessage(response.data.message);
      toast.success("Email has been sent!");
      // Dispatching action to update credentials in Redux store
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <main className={styles.login}>
      <Header />
      <FormContainer>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Divider>Forgot Password</Divider>

          <div>
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={handleEmailChange}
            />
          </div>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </form>
      </FormContainer>
    </main>
  );
};

export default ForgotPasswordScreen;

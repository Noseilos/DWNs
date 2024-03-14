import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import styles from "./styles/Login.module.css";
import Header from "../components/Header";
import { Divider } from "@mui/material";
import { Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  const navigate = useNavigate();
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming you store the reset token in the URL query parameter named 'token'
      const queryParams = new URLSearchParams(window.location.search);
      const resetToken = queryParams.get("resetToken");
      const response = await axios.post(
        `/api/users/resetpassword/${resetToken}`,
        {
          password,
          resetToken: resetToken,
        }
      );
      setMessage(response.data.message);
      navigate(redirect);
      toast.success("Password reset successful!");
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <main className={styles.login}>
      <Header />
      <FormContainer>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Divider>Reset Password </Divider>
          <div className={styles.row}>
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter New Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className={styles.row}>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <Button type="submit" variant="primary">
            Reset Password
          </Button>
        </form>
      </FormContainer>
    </main>
  );
};

export default ResetPasswordScreen;

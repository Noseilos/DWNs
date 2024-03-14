import { useState, useEffect, Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import styles from "./styles/Login.module.css";
import Header from "../components/Header";
import Divider from "@mui/material/Divider";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      toast.success("Login successful!"); 
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <main className={styles.login}>
      <Header />
      <FormContainer>
        <form onSubmit={submitHandler} className={styles.form}>
          <Divider>LOGIN </Divider>
          <Form.Group className={styles.row}>
            <Form.Label>Email Address</Form.Label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </Form.Group>

          <Form.Group controlId="password" className={styles.row}>
            <Form.Label>Password</Form.Label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </Form.Group>

          <Button type="submit" variant="primary" disabled={isLoading}>
            Sign In
          </Button>

          {isLoading && <Loader />}
          <div className={styles.lnk}>
            <label>
              <Link className={styles.link} to="/forgot-password">
                Forgot Password?
              </Link>
            </label>
            <label>
              <Link className={styles.link} to="/register">
                Don't have an account?
              </Link>
            </label>
          </div>
        </form>
      </FormContainer>
    </main>
  );
};

export default LoginScreen;

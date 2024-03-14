import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import {
  useRegisterMutation,
  useUploadUserImageMutation,
} from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./styles/Register.module.css";
import { Divider } from "@mui/material";
import Header from "../components/Header";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  image: Yup.string().required("Image is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const [uploadUserImage, { isLoading: loadingUpload }] =
    useUploadUserImageMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      image: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.password !== values.confirmPassword) {
        toast.error("Passwords do not match!");
        return;
      } else {
        try {
          const res = await register({ ...values }).unwrap();
          dispatch(setCredentials({ ...res }));
          navigate(redirect);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    },
  });

  const uploadFileHandler = async (e) => {
    const formData = new FormData();

    if (e.target.files.length > 0) {
      formData.append("image", e.target.files[0]);
    }

    try {
      const res = await uploadUserImage(formData).unwrap();
      toast.success(res.message);
      formik.setFieldValue("image", res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      console.log(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  return (
    <main className={styles.register}>
      <Header />
      <FormContainer>
        <Form onSubmit={formik.handleSubmit} className={styles.form}>
          <Divider>REGISTER </Divider>

          <Form.Group controlId="name" className={styles.row}>
            <Form.Label>Name</Form.Label>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <div className="text-danger">
              {formik.touched.name && formik.errors.name}
            </div>
          </Form.Group>

          <Form.Group controlId="email" className={styles.row}>
            <Form.Label>Email</Form.Label>
            <input
              type="email"
              placeholder="email@example.com"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <div className="text-danger">
              {formik.touched.email && formik.errors.email}
            </div>
          </Form.Group>

          <Form.Group controlId="image" className={styles.row}>
            <Form.Label>Avatar</Form.Label>
            <input
              type="file"
              label="Choose files"
              onChange={uploadFileHandler}
            />
            <div className="text-danger">
              {formik.touched.image && formik.errors.image}
            </div>
          </Form.Group>

          <Form.Group controlId="password" className={styles.row}>
            <Form.Label>Password</Form.Label>
            <input
              type="password"
              placeholder="••••••••"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <div className="text-danger">
              {formik.touched.password && formik.errors.password}
            </div>
          </Form.Group>

          <Form.Group controlId="confirmPassword" className={styles.row}>
            <Form.Label>Confirm Password</Form.Label>
            <input
              type="password"
              placeholder="••••••••"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            <div className="text-danger">
              {formik.touched.confirmPassword && formik.errors.confirmPassword}
            </div>
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="my-3"
            disabled={isLoading}
          >
            Register
          </Button>

          {isLoading && <Loader />}
          <div className={styles.lnk}>
            <label>
              <Link className={styles.link} to="/login">
                Have an account?
              </Link>
            </label>
          </div>
        </Form>
      </FormContainer>
    </main>
  );
};

export default RegisterScreen;

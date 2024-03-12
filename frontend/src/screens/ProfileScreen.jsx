import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import {
  useUpdateUserImageMutation,
} from "../slices/usersApiSlice";
import styles from "./styles/ProfileScreen.module.css";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uploadUserImage, { isLoading: loadingUpload }] =
  useUpdateUserImageMutation();
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingProfileUpdate }] =
    useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setUserId(userInfo._id);
    }
  }, [userInfo, userInfo.name, userInfo.email, userInfo._id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  
  const uploadFileHandler = async (e) => {
    const formData = new FormData();

    if (e.target.files.length > 0) {
      formData.append("image", e.target.files[0]);
    }


    try {
      const res = await uploadUserImage({ userId, data: formData }).unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      console.log(err?.data?.message || err.error);
    }
  };

  return (
    <div className={styles.profile}>
      <div className={`${styles.form__group} ${styles.form__photo_upload}`}>
        <figure htmlFor="image">
          <img
            htmlFor="image"
            src={userInfo.image}
            alt="profile"
            className={styles.img}
          />
        </figure>
        {/* <input
          className={styles.form__upload}
          type="file"
          accept="image/*"
          id="image"
          name="image"
          onChange={uploadFileHandler}
        />
        <label htmlFor="image">Choose New Photo</label> */}
      </div>
      <Form onSubmit={submitHandler} className={styles.form}>
        <Form.Group controlId="name" className={styles.row}>
          <Form.Label>Name: </Form.Label>
          <input
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </Form.Group>

        <Form.Group controlId="email" className={styles.row}>
          <Form.Label>Email: </Form.Label>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </Form.Group>

        <Form.Group controlId="password" className={styles.row}>
          <Form.Label>Password: </Form.Label>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </Form.Group>

        <Form.Group controlId="confirmPassword" className={styles.row}>
          <Form.Label>Confirm Password: </Form.Label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </Form.Group>

        <div>
          <Button className={`${styles.btn} ${styles.primary}`} type="submit">
            Update
          </Button>
        </div>

        {loadingProfileUpdate && <Loader />}
      </Form>
    </div>
  );
};

export default ProfileScreen;

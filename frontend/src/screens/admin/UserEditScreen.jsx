import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";
import FormContainer from "../../components/FormContainer";
import styles from "../styles/UserEdit.module.css";
import { toast } from "react-toastify";
import Header from "../../components/Header";

const UserEditScreen = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success("User Updated Successfully");
      refetch();
      navigate("/admin/users");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <main className={styles.useredit_container2}>
        <Header />

        <div className={styles.useredit_container}>
          <div className={styles.form}>
            <div className={styles.userlist_title}>
              <h4>Edit User: {name}</h4>
            </div>

            <FormContainer>
              {loadingUpdate && <Loader />}
              {isLoading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <Form onSubmit={submitHandler} >
                  <Form.Group controlId="name" className={styles.row}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="email"  className={styles.row}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="isAdmin" className={styles.row}>
                    <Form.Check
                      type="checkbox"
                      label="Give admin privileges"
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                  </Form.Group>

                  <Button type="submit" className="my-2" style={{marginRight: "10px"}}>
                    Update
                  </Button>
                  <Link to={`/admin/users`} className="btn btn-light my-3">
                    Done
                  </Link>
                </Form>
              )}
            </FormContainer>
          </div>
        </div>
      </main>
    </>
  );
};

export default UserEditScreen;

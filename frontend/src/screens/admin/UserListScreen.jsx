import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Tooltip } from "react-bootstrap";
import { FaTimes, FaTrash, FaCheck, FaEdit } from "react-icons/fa";
import { TbRestore } from "react-icons/tb";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useSoftDeleteUserMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import styles from "../styles/UserList.module.css";
import Header from "../../components/Header";

const UserlistScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();
  const [softDeleteUser, { isLoading: loadingSoftDelete }] =
    useSoftDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Delete User?")) {
      try {
        await deleteUser(id);
        refetch();
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const softDeleteUserHandler = async (id) => {
    if (window.confirm("Soft Delete User?")) {
      try {
        await softDeleteUser(id); // Use the softDeleteUser mutation
        refetch();
        toast.success("User soft deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  // Filter users where isDeleted is false
  const activeUsers = users?.filter((user) => !user.isDeleted);

  return (
    <>
    <div className={styles.userlist_container2}>
      <Header/>

      {loadingSoftDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className={styles.userlist_container}>
          <div className={styles.userlist}>
            <div className={styles.userlist_title}>
              <h4>Registered Users</h4>
              <LinkContainer
                to="/admin/deleted-users"
                style={{ float: "right", color: "white" }}
              >
                <Button className="cta" style={{ justifyContent: "end" }}>
                  Deleted Users
                </Button>
              </LinkContainer>
            </div>
            <Table striped hover responsive className={styles.table}>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {activeUsers.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>
                      <a
                        style={{ color: "rgb(0, 196, 106)" }}
                        href={`mailto:${user.email}`}
                      >
                        {user.email}
                      </a>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <FaCheck style={{ color: "green" }} />
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/user/edit/${user._id}`}>
                        <button className={styles.action_btn}>
                          <FaEdit />
                        </button>
                      </LinkContainer>
                      <button
                        className={styles.action_btn2}
                        style={{ margin: "10px" }}
                        onClick={() => softDeleteUserHandler(user._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default UserlistScreen;

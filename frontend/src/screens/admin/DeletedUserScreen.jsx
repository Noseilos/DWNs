import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes, FaBan, FaTrashRestore, FaCheck } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useRestoreUserMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import styles from "../styles/UserList.module.css";
import Header from "../../components/Header";

const DeletedUserScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();
  const [restoreUser] = useRestoreUserMutation();

  const deleteConfirmed = async () => {
    setShowDeleteModal(false);
    try {
      await deleteUser(userIdToDelete);
      refetch();
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const restoreHandler = (id) => {
    setUserIdToDelete(id);
    setShowRestoreModal(true);
  };

  const restoreConfirmed = async () => {
    setShowRestoreModal(false);
    try {
      await restoreUser(userIdToDelete);
      refetch();
      toast.success("User restored successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // Filter users where isDeleted is false
  const activeUsers = users?.filter((user) => user.isDeleted);

  return (
    <>
      <div className={styles.userlist_container2}>
        <Header />

        <div className={styles.userlist_container}>
          <div className={styles.userlist}>
            <div className={styles.userlist_title}>
              <h4>Deleted Users</h4>
              <LinkContainer
                to="/admin/users"
                style={{ float: "right", color: "white" }}
              >
                <Button className="cta">Registered Users</Button>
              </LinkContainer>
            </div>
            {loadingDelete && <Loader />}
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">
                {error?.data?.message || error.error}
              </Message>
            ) : (
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
                        <button
                          className={styles.action_btn3}
                          onClick={() => restoreHandler(user._id)}
                        >
                          <FaTrashRestore />
                        </button>
                        <button
                          className={styles.action_btn2}
                          style={{ margin: "10px" }}
                          onClick={() => setShowDeleteModal(true)}
                        >
                          <FaBan style={{ color: "white" }} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
      {/* Modal for Delete Confirmation */}
      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to permanently delete user?</p>
            <div className={styles.modal_buttons}>
              <Button onClick={deleteConfirmed}>Yes</Button>
              <Button onClick={() => setShowDeleteModal(false)}>No</Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Restore Confirmation */}
      {showRestoreModal && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <h2>Confirm Restoration</h2>
            <p>Are you sure you want to restore user?</p>
            <div className={styles.modal_buttons}>
              <Button onClick={restoreConfirmed}>Yes</Button>
              <Button onClick={() => setShowRestoreModal(false)}>No</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeletedUserScreen;

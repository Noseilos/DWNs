import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetWastesQuery,
  useDeleteWasteMutation,
} from "../../slices/wasteSlice";
import styles from "../styles/UserList.module.css";
import { toast } from "react-toastify";
import Header from "../../components/Header";

const WasteListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetWastesQuery({
    pageNumber,
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [wasteIdToDelete, setWasteIdToDelete] = useState(null);

  const [deleteWaste, { isLoading: loadingDelete }] = useDeleteWasteMutation();

  const deleteConfirmed = async () => {
    setShowDeleteModal(false);
    try {
      await deleteWaste(wasteIdToDelete);
      toast.success("Waste Deleted");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteHandler = (id) => {
    setWasteIdToDelete(id);
    setShowDeleteModal(true);
  };

  return (
    <>
      <div className={styles.userlist_container2}>
        <Header />
        <>
          <div className={styles.userlist_container}>
            <div className={styles.userlist}>
              <div className={styles.userlist_title}>
                <h4>Wastes</h4>
                <LinkContainer
                  to={`/admin/wastes/create`}
                  style={{ float: "right", color: "white" }}
                >
                  <Button className="cta" style={{ justifyContent: "end" }}>
                    Create Waste
                  </Button>
                </LinkContainer>
              </div>
              {loadingDelete && <Loader />}
              {isLoading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">
                  {error.data?.message || error.message}
                </Message>
              ) : (
                <Table striped hover responsive className={styles.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NAME</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((was) => (
                      <tr key={was._id}>
                        <td>{was._id}</td>
                        <td>{was.name}</td>
                        <td>
                          <LinkContainer to={`/admin/waste/edit/${was._id}`}>
                            <button className={styles.action_btn}>
                              <FaEdit />
                            </button>
                          </LinkContainer>
                          <button
                            className={styles.action_btn2}
                            style={{ margin: "10px" }}
                            onClick={() => deleteHandler(was._id)}
                          >
                            <FaTrash style={{ color: "white" }} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </div>
        </>
      </div>
      {/* Modal for Delete Confirmation */}
      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles.modal_content}>
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this waste?</p>
            <div className={styles.modal_buttons}>
              <Button onClick={deleteConfirmed}>Yes</Button>
              <Button onClick={() => setShowDeleteModal(false)}>No</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WasteListScreen;

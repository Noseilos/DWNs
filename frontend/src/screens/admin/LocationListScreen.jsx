import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetLocationsQuery,
  useDeleteLocationMutation,
} from "../../slices/locationSlice";
import styles from "../styles/UserList.module.css";
import { toast } from "react-toastify";
import Paginate from "../../components/Paginate";
import Header from "../../components/Header";

const LocationListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetLocationsQuery({
    pageNumber,
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [locationIdToDelete, setLocationIdToDelete] = useState(null);

  const [deleteLocation, { isLoading: loadingDelete }] =
    useDeleteLocationMutation();

  const deleteConfirmed = async () => {
    setShowDeleteModal(false);
    try {
      await deleteLocation(locationIdToDelete);
      toast.success("Location Deleted");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteHandler = (id) => {
    setLocationIdToDelete(id);
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
                <h4>Locations</h4>
                <LinkContainer
                  to={`/admin/locations/create`}
                  style={{ float: "right", color: "white" }}
                >
                  <Button className="cta" style={{ justifyContent: "end" }}>
                    Create Location
                  </Button>
                </LinkContainer>
              </div>
              {loadingDelete && <Loader />}
              {isLoading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
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
                    {data.map((loc) => (
                      <tr key={loc._id}>
                        <td>{loc._id}</td>
                        <td>{loc.name}</td>
                        <td>
                          <LinkContainer to={`/admin/location/edit/${loc._id}`}>
                            <button className={styles.action_btn}>
                              <FaEdit />
                            </button>
                          </LinkContainer>
                          <button
                            className={styles.action_btn2}
                            style={{ margin: "10px" }}
                            onClick={() => deleteHandler(loc._id)}
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
            <p>Are you sure you want to delete this location?</p>
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

export default LocationListScreen;

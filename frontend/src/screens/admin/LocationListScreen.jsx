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

  const [deleteLocation, { isLoading: loadingDelete }] =
    useDeleteLocationMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Delete item?")) {
      try {
        await deleteLocation(id);
        toast.success("Location Deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
    }
  };

  return (
    <>
      <div className={styles.userlist_container2}>
        <Header />
        {loadingDelete && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            {loadingDelete && <Loader />}
            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
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
                            <LinkContainer
                              to={`/admin/location/edit/${loc._id}`}
                            >
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
                  <Paginate
                    pages={data.pages}
                    page={data.page}
                    isAdmin={true}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default LocationListScreen;

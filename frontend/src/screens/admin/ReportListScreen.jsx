import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Modal } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetReportsQuery, useDeleteReportMutation } from "../../slices/reportsSlice";
import { Bar, Doughnut } from "react-chartjs-2";
import styles from "../styles/UserList.module.css";
import Header from "../../components/Header";
import { FaList, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const ReportListScreen = () => {
  const { data: reports, isLoading, error, refetch } = useGetReportsQuery();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reportIdToDelete, setReportIdToDelete] = useState(null);

  const [deleteReport, { isLoading: loadingDelete }] =
    useDeleteReportMutation();

  const deleteConfirmed = async () => {
    setShowDeleteModal(false);
    try {
      await deleteReport(reportIdToDelete);
      toast.success("Report Deleted");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteHandler = (id) => {
    setReportIdToDelete(id);
    setShowDeleteModal(true);
  };

  return (
    <>
      <main className={styles.userlist_container2}>
        <Header />
        <>
          <div className={styles.userlist_container}>
            <div className={styles.reportsContainer}>
              <div className={styles.userlist_title}>
                <h4>Reports</h4>
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
                      <th>REPORT ID</th>
                      <th>USER ID</th>
                      <th>LOCATION</th>
                      <th>SUMMARY</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(reports) &&
                      reports.map((report) => (
                        <tr key={report.id}>
                          <td>{report.id}</td>
                          <td>{report.user}</td>
                          <td>{report.locationName}</td>
                          <td>{report.summary}</td>
                          <td>
                            <LinkContainer to={`/report/${report.id}`}>
                              <button className={styles.action_btn}>
                                <FaList />
                              </button>
                            </LinkContainer>
                            <button
                            className={styles.action_btn2}
                            style={{ margin: "10px" }}
                            onClick={() => deleteHandler(report._id)}
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
      </main>
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

export default ReportListScreen;
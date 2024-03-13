import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Modal } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetReportsQuery } from "../../slices/reportsSlice";
import { Bar, Doughnut } from "react-chartjs-2";
import styles from "../styles/UserList.module.css";
import Header from "../../components/Header";
import { FaList, FaTrash } from "react-icons/fa";

const ReportListScreen = () => {
  const { data: reports, isLoading, error } = useGetReportsQuery();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reportIdToDelete, setReportIdToDelete] = useState(null);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = (reportId) => {
    setReportIdToDelete(reportId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = () => {
    // Perform delete action here with reportIdToDelete
    handleCloseDeleteModal();
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
    </>
  );
};

export default ReportListScreen;

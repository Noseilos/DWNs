import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Modal } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetReportsQuery,
  useDeleteReportMutation,
} from "../../slices/reportsSlice";
import { Bar, Doughnut } from "react-chartjs-2";
import styles from "../styles/UserList.module.css";
import Header from "../../components/Header";
import { FaList, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const UnverifiedReportListScreen = () => {
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

  if (reports == null) {
    return (
      <div className={styles.userlist_container2}>
        <Header />
        <div className={styles.userlist_container}>
          <div className={styles.userlist}>
            <div className={styles.userlist_title}>
              <h4>Reports</h4>
            </div>
            <div>
              <Loader />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.userlist_container2}>
        <Header />
        <div className={styles.userlist_container}>
          <div className={styles.userlist}>
            <div className={styles.userlist_title}>
              <h4>Reports</h4>
            </div>
            <div>
              <Loader />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!reports) {
    return (
      <div className={styles.userlist_container2}>
        <Header />
        <div className={styles.userlist_container}>
          <div className={styles.userlist}>
            <div className={styles.userlist_title}>
              <h4>Reports</h4>
            </div>
            <div>
              <h5>No reports data available.</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const reportsPerDay = {};
  reports.forEach((report) => {
    const date = new Date(report.createdAt);

    if (!isNaN(date.getTime())) {
      const formattedDate = date.toLocaleDateString();
      reportsPerDay[formattedDate] = (reportsPerDay[formattedDate] || 0) + 1;
    }
  });

  const barChartData = {
    labels: Object.keys(reportsPerDay),
    datasets: [
      {
        label: "Reports per Day",
        backgroundColor: "rgb(0, 196, 106)",
        borderColor: "white",
        borderWidth: 3,
        color: "white",
        hoverBackgroundColor: "rgba(75, 209, 200, 1)",
        hoverBorderColor: "rgba(88, 176, 0, 1)",
        data: Object.values(reportsPerDay),
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          color: "white",
        },
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(200, 200, 200, 1)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Reports",
          color: "white",
        },
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(200, 200, 200, 1)",
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white", // Set the label color to white
        },
      },
    },
  };

  const reportsPerLocation = {};
  reports.forEach((report) => {
    const locationName = report.locationName;
    reportsPerLocation[locationName] =
      (reportsPerLocation[locationName] || 0) + 1;
  });

  const doughnutData = {
    labels: Object.keys(reportsPerLocation),
    datasets: [
      {
        data: Object.values(reportsPerLocation),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const doughnutOptions = {
    plugins: {
      legend: {
        labels: {
          color: "white", // Set the legend labels color to white
        },
      },
    },
  };

  const unvalidatedReports = reports?.filter((report) => !report.isVerified);

  return (
    <main className={styles.userlist_container2}>
      <Header />
      <div className={styles.userlist_container}>
        <div className={styles.reportsContainer}>
          <div className={styles.userlist_title}>
            <h4>Unverified Reports</h4>
            <LinkContainer
              to="/admin/reports"
              style={{ float: "right", color: "white", marginLeft: "35rem" }}
            >
              <Button className="cta" style={{ justifyContent: "end" }}>
                Verified Reports
              </Button>
            </LinkContainer>
          </div>
          {loadingDelete && <Loader />}
          {error ? (
            <Message variant="danger">
              {error?.data?.message || error.error}
            </Message>
          ) : (
            <>
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
                  {Array.isArray(unvalidatedReports) &&
                    unvalidatedReports.map((report) => (
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
            </>
          )}
        </div>
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
    </main>
  );
};

export default UnverifiedReportListScreen;

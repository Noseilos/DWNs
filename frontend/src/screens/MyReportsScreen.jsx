import { LinkContainer } from "react-router-bootstrap";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { FaList, FaTimes } from "react-icons/fa";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetMyReportsQuery } from "../slices/reportsSlice";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import styles from "./styles/UserList.module.css";
import Header from "../components/Header";

import "chart.js/auto"
const MyReportsScreen = () => {
  const { data: reports, isLoading, error } = useGetMyReportsQuery();

  if (reports == null) {
    return (
      <div className={styles.userlist_container2}>
        <Header />
        <div className={styles.userlist_container}>
          <div className={styles.userlist}>
            <div className={styles.userlist_title}>
              <h4>My Reports</h4>
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
              <h4>My Reports</h4>
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
              <h4>My Reports</h4>
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

  return (
    <>
      <div className={styles.userlist_container2}>
        <Header />

        <div className={styles.userlist_container}>
          <div className={styles.userlist}>
            <div className={styles.userlist_title}>
              <h4>My Reports</h4>
            </div>
            {isLoading && <Loader />}
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
                    <th>LOCATION</th>
                    <th>SUMMARY</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(reports) &&
                    reports.map((report) => (
                      <tr key={report.id}>
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

            <Bar data={barChartData} options={chartOptions} />

            {/* <Line data={data} style={{ backgroundColor: 'rgba(87, 82, 82, 0.5)' }}/> */}
            {/* <Doughnut data={pieData} style={{ background: 'rgba(56, 56, 56, 0.7)' }}/> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyReportsScreen;

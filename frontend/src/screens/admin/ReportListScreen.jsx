import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetReportsQuery } from "../../slices/reportsSlice";
import { Bar, Doughnut } from "react-chartjs-2";
import styles from "../styles/UserList.module.css";
import Header from "../../components/Header";

const ReportListScreen = () => {
  const { data: reports, isLoading, error } = useGetReportsQuery();

  if (reports == null) {
    return <Loader />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!reports) {
    return <div>No reports data available.</div>;
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
          color: "rgba(120, 144, 156, 1)",
        },
        ticks: {
          color: "rgba(120, 144, 156, 1)",
        },
        grid: {
          color: "rgba(200, 200, 200, 1)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Reports",
          color: "rgba(120, 144, 156, 1)",
        },
        ticks: {
          color: "rgba(120, 144, 156, 1)",
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

  return (
    <>
      <main className={styles.userlist_container2}>
        <Header />
        <h1>Reports</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>LOCATION</th>
                  <th>SUMMARY</th>
                  <th></th>
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
                          <Button variant="light" className="btn-sm">
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>

            <Bar data={barChartData} options={chartOptions} />
            {/* <Line data={data} style={{ backgroundColor: 'rgba(87, 82, 82, 0.5)' }}/> */}
            <Doughnut
              data={doughnutData}
              style={{ background: "rgba(56, 56, 56, 0.7)" }}
            />
          </>
        )}
      </main>
    </>
  );
};

export default ReportListScreen;

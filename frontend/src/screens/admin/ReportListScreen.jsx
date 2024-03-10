import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useGetReportsQuery } from '../../slices/reportsSlice'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { format } from "date-fns"

const ReportListScreen = () => {

  const { data: reports, isLoading, error } = useGetReportsQuery();
  console.log(reports);

  if (reports == null) {
    return <Loader />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!reports) {
    return <div>No reports data available.</div>;
  }

  const groupedReports = reports.reduce((acc, report) => {
    const date = format(new Date(report.createdAt), 'yyyy-MM-dd');
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const dates = Object.keys(groupedReports);
  const reportCounts = Object.values(groupedReports);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Report Frequency',
        data: reportCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <h1>Reports</h1>
      { isLoading ? <Loader /> : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { reports.map((report) => (
              <tr key={report._id}>
                <td>{report._id}</td>
                <td>{ report.user && report.user.name }</td>
                <td>{ report.createdAt.substring(0, 10) }</td>
                <td>₱{ parseFloat(report.totalPrice).toLocaleString() }</td>
                <td>
                  { report.isPaid ? (
                    report.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  { report.isDelivered ? (
                    report.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/report/${report._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            )) }
          </tbody>
        </Table>
        {/* <Line data={data} style={{ backgroundColor: 'rgba(87, 82, 82, 0.5)' }}/> */}
        <Bar data={data} style={{ background: 'rgba(73, 74, 72, 0.6)' }}/>
        {/* <Doughnut data={pieData} style={{ background: 'rgba(56, 56, 56, 0.7)' }}/> */}
        </>
      ) }
    </>
  )
}

export default ReportListScreen
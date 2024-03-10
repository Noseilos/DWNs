import { Fragment } from "react";
import { NavLink } from "react-router-dom";
import ReportChartScreen from "./ReportChartScreen";
import WasteChart from "./WasteChart";

const Dashboard = () => {
  // Fake data for Reports and Wastes
  const reportsData = 22;
  const wastesData = 12;

  return (
    <Fragment>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card text-white bg-success mb-3">
              <div className="card-body">
                <div className="text-center">
                  <h5 className="card-title">Reports</h5>
                  <h6 className="text-center card-font-size">{reportsData}</h6>
                </div>
                <NavLink
                  to="/reports"
                  className="card-link btn btn-outline-light d-block mx-auto"
                >
                  View Details
                </NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-white bg-danger mb-3">
              <div className="card-body">
                <div className="text-center">
                  <h5 className="card-title">Wastes</h5>
                  <h6 className="text-center card-font-size">{wastesData}</h6>
                </div>
                <NavLink
                  to="/wastes"
                  className="card-link btn btn-outline-light d-block mx-auto"
                >
                  View Details
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <h1 style={{ color: "white" }}>User Reports</h1>

            <div className="bg-transparent">
              <div>
                <ReportChartScreen />
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <h1 style={{ color: "white" }}>Waste Generated</h1>

            <div className="bg-transparent">
              <div>
                <WasteChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;

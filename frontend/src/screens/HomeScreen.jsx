import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

const HomeScreen = () => {
  
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
        <section>
          <h1>
            Dynamic Waste Navigations:
            <br />
            An Extensive Data Analysis for Waste Management Utilizing Geographical Information System (GIS) in TUP Taguig
          </h1>
          <h2>
            Explore the waste landscape of TUP-Taguig through data-driven insights. Our analysis provides a
            comprehensive strategy for sustainable waste management in the campus.
          </h2>
          {userInfo && (
            <Link to="/app" className="cta">
              Start
            </Link>
          )}
        </section>
    </>
  );
};

export default HomeScreen;

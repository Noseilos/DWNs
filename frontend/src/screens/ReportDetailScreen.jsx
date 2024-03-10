import React from 'react'

import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetReportDetailsQuery } from "../slices/reportsSlice";
import Spinner from "../components/Spinner";
import '../assets/css/style.css'

const ReportDetailScreen = () => {

  const { id: reportId } = useParams();
  const {
    data: report,
    isLoading,
    refetch,
    error,
  } = useGetReportDetailsQuery(reportId);
  console.log(report)
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <section className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">&nbsp;</div>
          <img className="header__hero-img" src={report.images[0]} alt={report.locationName} />
        </div>

        <div className="heading-box">
          <h1 className="heading-primary">
            <span>{`${report.locationName} report`}</span>
          </h1>
        </div>
      </section>

      <section className="section-description">
        <div className="description-box">
          <h2 className="heading-secondary ma-bt-lg">{`About ${report.locationName} report`}</h2>
          <p className="description__text">{report.summary}</p>
        </div>
      </section>

      <section className="section-pictures">
        {report.images.map((img, i) => (
          <div className="picture-box" key={i}>
            <img className={`picture-box__img picture-box__img--${i + 1}`} src={img} alt={`The Park Camper Tour ${i + 1}`} />
          </div>
        ))}
      </section>

      <section className="section-map">
        <div id="map" data-locations={JSON.stringify([report.location])}></div>
      </section>
    </div>
  )
}

export default ReportDetailScreen
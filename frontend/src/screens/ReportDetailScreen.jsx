import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetReportDetailsQuery } from "../slices/reportsSlice";
import Spinner from "../components/Spinner";
import Mapbox from "./MapBox";
import styles from "./styles/UserEdit.module.css";
import "../assets/css/style.css";
import Header from "../components/Header";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useVerifyReportMutation } from "../slices/reportsSlice";
import { toast } from 'react-toastify'

const ReportDetailScreen = () => {
  const { id: reportId } = useParams();
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const {
    data: report,
    isLoading,
    refetch,
    error,
  } = useGetReportDetailsQuery(reportId);

  const [verifyReport, { isLoading: loadingUpdate }] = useVerifyReportMutation();

  if (isLoading) {
    return <Spinner />;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await verifyReport({ reportId, isVerified });
      toast.success("User Updated Successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // Check if report is not undefined before accessing its properties
  const images = report?.images || [];

  return (
    
    <>
    <main className={styles.useredit_container2}>
      <Header />
      <div className={styles.useredit_container}>
        <div className="container">
          <section className="section-header">
            <div className="header__hero">
              <div className="header__hero-overlay">&nbsp;</div>
              {images.length > 0 && (
                <img
                  className="header__hero-img"
                  src={images[0]}
                  alt={report.locationName}
                />
              )}
            </div>

            <div className="heading-box">
              <h1 className="heading-primary">
                <span>{`${report.locationName} report`}</span>
              </h1>
              <h1
                className="heading-secondary"
                style={{ color: "white", marginTop: "20px" }}
              >
                <span>{`#${report._id}`}</span>
              </h1>
            </div>
          </section>

          <section className="section-description">
            <div className="description-box">
              <h1 className="heading-primary">
                <span>Summary</span>
              </h1>
            </div>
            <div className="description-box">
              <h2 className="heading-secondary">{report.summary}</h2>
            </div>
          </section>

          <section className="section-map" style={{ backgroundColor: "white" }}>
            <Mapbox locations={[report.location]} details={report} />
          </section>

          <section className="section-pictures">
            <Row xs={1} md={2} lg={3} className="g-4">
              {images.map((img, i) => (
                <Col key={i}>
                  <Card className="cardImage">
                    <div className="imageWrapper">
                      <Card.Img src={img} className="image" />
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </section>
          
        </div>
      </div>
    </main>
    <FormContainer>
      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler} >

          <Form.Group controlId="isAdmin" className={styles.row}>
            <Form.Check
              type="checkbox"
              label="Verify report"
              checked={isVerified}
              onChange={(e) => setIsVerified(e.target.checked)}
            />
          </Form.Group>

          <Button type="submit" className="my-2" style={{marginRight: "10px"}}>
            Update
          </Button>
          <Link to={`/admin/users`} className="btn btn-light my-3">
            Done
          </Link>
        </Form>
      )}
    </FormContainer>
  </>
  );
};

export default ReportDetailScreen;

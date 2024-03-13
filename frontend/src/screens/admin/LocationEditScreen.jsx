import React from "react";
import { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useUpdateLocationMutation,
  useUploadLocationImageMutation,
  useGetLocationDetailsQuery,
} from "../../slices/locationSlice";
import { toast } from "react-toastify";
import { Form, Button, FormGroup, FormControl } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { Carousel, Image as BootstrapImage } from "react-bootstrap";
import styles from "../styles/UserEdit.module.css";
import Header from "../../components/Header";

const LocationEditScreen = () => {
  const { id: locationId } = useParams();

  const [name, setName] = useState("");
  const [image, setImage] = useState([]);

  const navigate = useNavigate();

  const {
    data: location,
    isLoading,
    error,
    refetch,
  } = useGetLocationDetailsQuery(locationId);

  const [uploadLocationImage, { isLoading: loadingUpload }] =
    useUploadLocationImageMutation();
  const [updateLocation, { isLoading: loadingUpdate }] =
    useUpdateLocationMutation();

  useEffect(() => {
    if (location) {
      setName(location.name);
      setImage(location.image);
    }
  }, [location]);

  console.log(location);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedLocation = {
      locationId,
      name,
      image,
    };

    const result = await updateLocation(updatedLocation);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Location Updated");
      navigate("/admin/locations");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();

    if (e.target.files.length > 0) {
      formData.append("image", e.target.files[0]);
    }

    try {
      const res = await uploadLocationImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      console.log(err?.data?.message || err.error);
    }
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <>
      <main className={styles.useredit_container2}>
        <Header />

        <div className={styles.useredit_container}>
          <div className={styles.form}>
            <div className={styles.userlist_title}>
              <h4>Edit User: {name}</h4>
            </div>
            <FormContainer>
              {loadingUpdate && <Loader />}

              {isLoading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="name" className={styles.row}>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Location Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="image" className={styles.row}>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="file"
                      label="Choose files"
                      onChange={uploadFileHandler}
                    ></Form.Control>
                  </Form.Group>
                  {loadingUpload && <Loader />}
                  <BootstrapImage
                    src={location.image}
                    alt={location.name}
                    style={{
                      borderRadius: "10px",
                    }}
                    fluid
                  />

                  <Button
                    type="submit"
                    className="my-2"
                    style={{ marginRight: "10px" }}
                  >
                    Update
                  </Button>
                  <Link to={`/admin/locations`} className="btn btn-light my-3">
                    Done
                  </Link>
                </Form>
              )}
            </FormContainer>
          </div>
        </div>
      </main>
    </>
  );
};

export default LocationEditScreen;

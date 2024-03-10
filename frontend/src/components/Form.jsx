import { useEffect, useState } from "react";
import styles from "./styles/Form.module.css";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
import { useCreateReportMutation, useUploadReportImageMutation } from "../slices/reportsSlice";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import Message from "./Message";

function Form() {
  const [createReport, { isLoading: loadingCreate, error }] = useCreateReportMutation();
  const [uploadReportImage, { isLoading: loadingUpload }] = useUploadReportImageMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [locationName, setLocationName] = useState("");
  const [summary, setSummary] = useState("");
  const [images, setImages] = useState("");

  const location = useLocation();
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setLat(params.get('lat'));
    setLng(params.get('lng'));
  }, [location]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('image', e.target.files[i]);
    }

    try {
      const res = await uploadReportImage(formData).unwrap();
      toast.success(res.message);
      setImages(images); 
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      console.log(err?.data?.message || err.error);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
  
    const newReport = {
      _id: userInfo._id,
      locationName,
      summary,
      images,
      location: {
        type: 'Point',
        coordinates: [lat, lng],
      },
    };
  
    try {
      await createReport(newReport).unwrap();
      navigate("/app");
      toast.success('Report Submitted');
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  }

  if (loadingCreate) return <Spinner />;

  if (error) {
    console.log(error?.data?.message)
    return (
      <div className={styles.error}>
        An error occurred: {error.message}
      </div>
    );
  }

  return (
    <>
    { userInfo ? (
    <form
      className={`${styles.form} ${loadingCreate ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="locationName">Location name</label>
        <input
          id="locationName"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          required
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="summary">Summary</label>
        <textarea
          id="summary"
          onChange={(e) => setSummary(e.target.value)}
          value={summary}
          required
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="imageCover">Image</label>
        <input
          type="file"
          accept="image/*"
          id="imageCover"
          onChange={uploadFileHandler}
          required
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" >Add</Button>
        <BackButton />
      </div>
    </form>
    ) : (
      
      <Message>
        Please <Link to='/login'>log in</Link> to write a review{' '}
      </Message>
      ) }
    </>
  );
}

export default Form;

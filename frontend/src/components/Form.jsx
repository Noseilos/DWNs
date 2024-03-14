import { useEffect, useState } from "react";
import styles from "./styles/Form.module.css";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
import {
  useCreateReportMutation,
  useUploadReportImageMutation,
} from "../slices/reportsSlice";
import { useGetWastesQuery } from "../slices/wasteSlice";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import Message from "./Message";

function Form() {
  const { data: wastes, isLoading: loadingWaste } = useGetWastesQuery();

  const [createReport, { isLoading: loadingCreate, error }] =
    useCreateReportMutation();
  const [uploadReportImage, { isLoading: loadingUpload }] =
    useUploadReportImageMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [wasteName, setWasteName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [summary, setSummary] = useState("");
  const [images, setImages] = useState("");

  const location = useLocation();
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setLat(params.get("lat"));
    setLng(params.get("lng"));
    setLocationName(locationName);
    setWasteName(wasteName);
  }, [location, locationName]);

  const handleLocationChange = (e) => {
    setLocationName(e.target.value);
  };
  const handleWasteChange = (e) => {
    setWasteName(e.target.value);
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("image", e.target.files[i]);
    }

    try {
      const res = await uploadReportImage(formData).unwrap();
      toast.success(res.message);
      setImages(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
      console.log(err?.data?.message || err.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReport = {
      _id: userInfo._id,
      locationName,
      wasteName,
      summary,
      images,
      location: {
        type: "Point",
        coordinates: [lat, lng],
      },
    };

    console.log(newReport);
    try {
      await createReport(newReport).unwrap();
      navigate("/app");
      toast.success("Report Submitted");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  if (loadingCreate) return <Spinner />;

  if (error) {
    console.log(error?.data?.message);
    return (
      <div className={styles.error}>An error occurred: {error.message}</div>
    );
  }

  return (
    <>
      {userInfo ? (
        <form
          className={`${styles.form} ${loadingCreate ? styles.loading : ""}`}
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row gap-4">
            <div className="w-50">
              <label htmlFor="Longitude">Longitude</label>
              <input type="text" disabled value={lng ? lng : ""} />
            </div>
            <div className="w-50">
              <label htmlFor="Latitude">Latitude</label>
              <input type="text" disabled value={lat ? lat : ""} />
            </div>
          </div>

          <div className={styles.row}>
            <label htmlFor="Location name">Location Name</label>
            <input
              type="text"
              onChange={handleLocationChange}
              value={locationName}
              required
            />
          </div>

          <div className={styles.row}>
            <select
            className={styles.select}
              id="wasteSelect"
              value={wasteName}
              onChange={handleWasteChange}
              required
            >
              <option value="">- Select -</option>
              {wastes &&
                wastes.map((waste) => (
                  <option key={waste._id} value={waste.id}>
                    {waste.name}
                  </option>
                ))}
            </select>
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
              multiple
              onChange={uploadFileHandler}
              required
            />
          </div>

          <div className={styles.buttons}>
            <Button type="primary">Add</Button>
            <BackButton />
          </div>
        </form>
      ) : (
        <Message>
          Please <Link to="/login">log in</Link> to write a review{" "}
        </Message>
      )}
    </>
  );
}

export default Form;

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./styles/Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner";
import ReportMessage from "./ReportMessage";
import { useReports } from "../contexts/ReportsContext";
import { useCreateReportMutation } from "../slices/reportsSlice";
import { useLocation } from "react-router-dom";

function Form() {
  const [createReport, { isLoading: loadingCreate, error }] = useCreateReportMutation();

  const navigate = useNavigate();
  const [locationName, setLocationName] = useState("");
  const [summary, setSummary] = useState("");
  const [images, setImageCover] = useState("");

  const location = useLocation();
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setLat(params.get('lat'));
    setLng(params.get('lng'));
  }, [location]);

  // console.log(location)

  async function handleSubmit(e) {
    e.preventDefault();

    const newReport = {
      summary,
      images,
      location: {
        type: 'Point',
        coordinates: [lat, lng],
      },
    };

    await createReport(newReport);
    navigate("/app");
  }

  if (loadingCreate) return <Spinner />;

  return (
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
          onChange={(e) => setImageCover(e.target.value)}
          required
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;

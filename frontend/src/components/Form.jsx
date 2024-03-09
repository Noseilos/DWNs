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

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const [lat, lng] = useUrlPosition();
  const { createReport, isLoading } = useReports();
  const navigate = useNavigate();
  const [reportName, setReportName] = useState("");
  const [summary, setSummary] = useState("");
  const [imageCover, setImageCover] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  useEffect(() => {
    if (!lat && !lng) return;

    async function fetchReportData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else."
          );
        setReportName(data.name || data.locality || "");
        setStartLocation(`Lat: ${lat}, Lng: ${lng}`);
      } catch (err) {
        setGeocodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchReportData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!reportName ) return;

    const newReport = {
      name: reportName,
      slug: reportName,
      summary,
      imageCover,
      images: [imageCover],
      startLocation,
    };

    await createReport(newReport);
    navigate("/app/reports");
  }
  if (isLoadingGeocoding) return <Spinner />;
  if (!lat && !lng)
    return <ReportMessage message="Start by clicking on the map." />;
  if (geocodingError) return <ReportMessage message={geocodingError} />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="reportName">Location name</label>
        <input
          id="reportName"
          onChange={(e) => setReportName(e.target.value)}
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

import styles from "./styles/CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import ReportMessage from "./ReportMessage";
import { useReports } from "../contexts/ReportsContext";

function CityList() {
  const { cities, isLoading } = useReports();

  if (isLoading) return <Spinner />;

  if (!cities || !cities.length)
    return (
      <ReportMessage message="Add your first report by clicking on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;

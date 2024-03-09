import styles from "./styles/CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import ReportMessage from "./ReportMessage";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <ReportMessage message="Add your first report by clicking on the map" />
    );

    const countries = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country))
        return [...arr, { country: city.country, emoji: city.emoji}];
        else return arr;
    }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} />
      ))}
    </ul>
  );
}

export default CountryList;

import styles from "./styles/About.module.css";
import img from "../assets/dwn.png";
import img2 from "../assets/team.jpg";
import { FaGithub } from "react-icons/fa";
import Header from "../components/Header";
function About() {
  return (
    <main>
      <section className={styles.about}>
        <Header />

        <img
          style={{ width: "10%", marginBottom: "-40px" }}
          src={img}
          alt="DWN Logo"
        />
        <div className={styles.information}>
          <h2 style={{ margin: "1rem 5rem" }}>
            About
            <br /> Dynamic Waste Navigations
          </h2>
          <div style={{ margin: "1rem 1rem" }}>
            <p>
              Discover the story behind Dynamic Waste Navigations, a project
              committed to sustainable waste management in TUP-Taguig. Learn
              about our mission to create a cleaner and greener environment
              through data-driven solutions.
            </p>
            <p>
              Explore the challenges, initiatives, and aspirations that drive
              our commitment to responsible waste management in these
              communities.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.about2}>
        <h2>Team</h2>
        <div>
          <img src={img2} alt="Our Team" />
        </div>
        <div style={{ marginTop: "5rem" }}>
          <a href="https://github.com/Noseilos/DWNs">
            <FaGithub style={{ color: "white", fontSize: "5rem" }} />
          </a>
        </div>
      </section>
    </main>
  );
}

export default About;

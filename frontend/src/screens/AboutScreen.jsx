import styles from "./styles/About.module.css";
import img from "../assets/dwn.png";
function About() {
  return (
    <main className={styles.about}>
      <section>
        <img src={img} alt="DWN Logo" />
        <h2>About Dynamic Waste Navigations</h2>
        <div style={{ margin: "-5rem" }}>
          <p>
            Discover the story behind Dynamic Waste Navigations, a project
            committed to sustainable waste management in TUP-Taguig. Learn about
            our mission to create a cleaner and greener environment through
            data-driven solutions.
          </p>
          <p>
            Explore the challenges, initiatives, and aspirations that drive our
            commitment to responsible waste management in these communities.
          </p>
        </div>
      </section>
    </main>
  );
}

export default About;

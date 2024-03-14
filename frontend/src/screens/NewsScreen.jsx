import styles from "./styles/News.module.css";
import RRR from "../assets/img/RRR.jpg";
import waste from "../assets/img/waste.jpg";
import Header from "../components/Header";

function News() {
  return (
    <>
      {" "}
      <main className={styles.news}>
        <Header/>
      <h2>Read Our Latest News</h2>
        <section>
          <div>
            <img src={RRR} alt="overview of a large city with skyscrapers" />
          </div>
          <div>
            <h2>{/* {news.post} */}</h2>
            <p>
              In a world where environmental consciousness is paramount, the
              mantra of "Reduce, Reuse, Recycle" stands as a guiding principle
              for sustainable living. This ethos encourages individuals to
              minimize their ecological footprint by adopting mindful practices
              in their daily lives.
              
            </p>
          </div>
        </section>
        <section>
          <div>
            <img src={waste} alt="overview of a large city with skyscrapers" />
          </div>
          <div>
            <h2>{/* {news.post} */}</h2>
            <p>
              By reducing consumption and minimizing waste generation, we can
              significantly decrease the strain on natural resources and
              ecosystems. Whether it's opting for products with minimal
              packaging, conserving water and energy, or embracing a minimalist
              lifestyle, every effort to reduce contributes to a healthier
              planet.
              
            </p>
          </div>
        </section>
        <section>
          <div>
            <img src={RRR} alt="overview of a large city with skyscrapers" />
          </div>
          <div>
            <h2>{/* {news.post} */}</h2>
            <p>
              The concept of reuse promotes the idea of extending the lifespan
              of products and materials whenever possible. From utilizing
              reusable shopping bags and containers to repurposing items for new
              purposes, embracing reuse not only conserves resources but also
              fosters creativity and innovation.
              
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

export default News;

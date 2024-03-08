import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductCarousel";
import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import styles from "./styles/Homepage.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Header from "../components/Header";

const HomeScreen = () => {
  const { keyword } = useParams();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber: page,
  });

  useEffect(() => {
    if (data && data.products.length > 0) {
      setItems((prevItems) => [...prevItems, ...data.products]);
      if (data.page >= data.pages) {
        setHasMore(false);
      }
    }
  }, [data]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <main className={styles.homepage}>
      <Header/>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <section>
          <h1>
            Waste Management:
            <br />
            And Strategy To Sustainable Waste Management In TUP-Taguig
          </h1>
          <h2>
            Explore the waste landscape of TUP-Taguig through data-driven insights. Our analysis provides a
            comprehensive strategy for sustainable waste management in the campus.
          </h2>
          <Link to="/app" className="cta">
            Start
          </Link>
        </section>
      )}
    </main>
  );
};

export default HomeScreen;

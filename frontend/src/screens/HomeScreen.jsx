import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProductCarousel from '../components/ProductCarousel'
import { Link, useParams } from 'react-router-dom'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import InfiniteScroll from 'react-infinite-scroll-component';

const HomeScreen = () => {
  const { keyword } = useParams();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber: page });

  useEffect(() => {
    if (data && data.products.length > 0) {
      setItems(prevItems => [...prevItems, ...data.products]);
      if (data.page >= data.pages) {
        setHasMore(false);
      }
    }
  }, [data]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light mb-4'>Go Back</Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <InfiniteScroll
            dataLength={items.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<Loader />}
          >
            <Row>
              {items.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </InfiniteScroll>
        </>
      )}
    </>
  )
}

export default HomeScreen
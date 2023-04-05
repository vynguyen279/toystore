// eslint-disable-next-line
import React, { useState, useEffect, useContext } from "react";
import Helmet from "../components/Helmet/Helmet";
import ProductList from "../components/UI/ProductList";
import {getListBest, getListSale, getListNew} from '../server/callAPI'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from "../assets/images/hero-img.png";
import { Container, Row, Col } from "reactstrap";
import "../styles/home.css";
import "../App.css";
const Home = () => {
  const [sale, setSale] = useState([]);
  const [best, setBest] = useState([]);
  const [query, setQuery] = useState(0)

  
  useEffect(()=>{
      getSaleProducts()
      getBestProducts()
  }, [])


  const getSaleProducts = () => {
      let data = {
          KEY: 3
      }
  
      getListSale(data)
      .then(function (response) {
        setSale(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const getBestProducts = () => {
      let data = {
          KEY: 4
      }
  
      getListBest(data)
      .then(function (response) {
        setBest(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Helmet title={"Trang chủ"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <h1 className="hero__subtitle">Let's enjoy</h1>
                <h2>Welcome To My Playground</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis amet facere obcaecati hic rem consectetur nulla
                  alias dicta dignissimos quam dolorem ipsa voluptatem, omnis
                  odio iste sapiente. Nisi, quis autem?
                </p>
                <motion.button whileHover={{scale: 1.1}}className="buy__btn">
                  <Link to="/shop">Mua Ngay</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="hero image" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="sale__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title mb-4"><span style={{color: "rgb(255, 51, 102)"}}>S</span><span style={{color: "rgb(81, 67, 178)"}}>ả</span><span style={{color: "rgb(150, 219, 70)"}}>n</span><span style={{color: "rgb(253, 90, 15)"}}> P</span><span style={{color: "rgb(247, 173, 10)"}}>h</span><span style={{color: "rgb(253, 90, 15)"}}>ẩ</span><span style={{color: "rgb(53, 190, 234)"}}>m</span><span style={{color: "rgb(230, 22, 49)"}}> S</span><span style={{color: "rgb(87, 0, 70)"}}>a</span><span style={{color: "rgb(215, 57, 122)"}}>l</span><span style={{color: "rgb(87, 0, 255)"}}>e</span></h2>
            </Col>
            <ProductList data={sale} />
          </Row>
        </Container>
      </section>
      <section className="best__products">
      <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title mb-4">Sản Phẩm Bán Chạy Nhất</h2>
            </Col>
            <ProductList data={best} />
          </Row>
        </Container>
      </section>
      <section className="new__products">
      <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title mb-4">Sản Phẩm Mới</h2>
            </Col>
            <ProductList data={sale} />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;

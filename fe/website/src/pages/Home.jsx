// eslint-disable-next-line
import React, { useState, useEffect } from "react";
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
  const [newsp, setNewSp] = useState([]);
  const [best, setBest] = useState([]);
  // const [new, setNew] = useState([]);
  const [query, setQuery] = useState(0)

  
  useEffect(()=>{
      getSaleProducts()
      getNewProducts()
      getBestProducts()
  }, [])



  const getSaleProducts = () => {
      let data = {
          KEY: 4
      }
  
      getListSale(data)
      .then(function (response) {
        if(!response.data.status)
        setSale([]);
        else
        setSale(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const getNewProducts = () => {
      let data = {
          KEY: 4
      }
  
      getListNew(data)
      .then(function (response) {
        if(!response.data.status)
        setNewSp([]);
        else
        setNewSp(response.data.data);
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
        if(!response.data.status)
        setBest([]);
        else
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
                  Thỏa thích mua sắm với những ưu đãi hấp dẫn. Cam kết mang lại những sản phẩm chất lượng cao, mang đến niềm vui cho hàng ngàn trẻ nhỏ.

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
      {sale.length==0? (<h1></h1>): (<section className="sale__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title mb-4"><span style={{color: "rgb(255, 51, 102)"}}>S</span><span style={{color: "rgb(81, 67, 178)"}}>ả</span><span style={{color: "rgb(150, 219, 70)"}}>n</span><span style={{color: "rgb(253, 90, 15)"}}> P</span><span style={{color: "rgb(247, 173, 10)"}}>h</span><span style={{color: "rgb(253, 90, 15)"}}>ẩ</span><span style={{color: "rgb(53, 190, 234)"}}>m</span><span style={{color: "rgb(230, 22, 49)"}}> S</span><span style={{color: "rgb(87, 0, 70)"}}>a</span><span style={{color: "rgb(215, 57, 122)"}}>l</span><span style={{color: "rgb(87, 0, 255)"}}>e</span></h2>
            </Col>
            <ProductList data={sale} />
          </Row>
        </Container>
      </section>)}
      <section className="best__products">
      <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title mb-4"><span style={{color: "rgb(255, 51, 102)"}}>S</span><span style={{color: "rgb(81, 67, 178)"}}>ả</span><span style={{color: "rgb(150, 219, 70)"}}>n</span><span style={{color: "rgb(253, 90, 15)"}}> P</span><span style={{color: "rgb(247, 173, 10)"}}>h</span><span style={{color: "rgb(253, 90, 15)"}}>ẩ</span><span style={{color: "rgb(53, 190, 234)"}}>m</span><span style={{color: "rgb(230, 22, 49)"}}> B</span><span style={{color: "rgb(87, 0, 70)"}}>á</span><span style={{color: "rgb(215, 57, 122)"}}>n</span><span style={{color: "rgb(87, 0, 255)"}}> C</span><span style={{color: "rgb(150, 219, 70)"}}>h</span><span style={{color: "rgb(53, 190, 234)"}}>ạ</span><span style={{color: "rgb(255, 51, 102)"}}>y</span></h2>
            </Col>
            {best.length === 0? (<h1>Không có sản phẩm best!</h1>) : (<ProductList data={best} />)}
          </Row>
        </Container>
      </section>
      <section className="new__products">
      <Container>
          <Row>
            <Col lg="12" className="text-center">
            <h2 className="section__title mb-4"><span style={{color: "rgb(255, 51, 102)"}}>S</span><span style={{color: "rgb(81, 67, 178)"}}>ả</span><span style={{color: "rgb(150, 219, 70)"}}>n</span><span style={{color: "rgb(253, 90, 15)"}}> P</span><span style={{color: "rgb(247, 173, 10)"}}>h</span><span style={{color: "rgb(253, 90, 15)"}}>ẩ</span><span style={{color: "rgb(53, 190, 234)"}}>m</span><span style={{color: "rgb(230, 22, 49)"}}> M</span><span style={{color: "rgb(87, 0, 70)"}}>ớ</span><span style={{color: "rgb(215, 57, 122)"}}>i</span></h2>
            </Col>
            {newsp.length==0? <h1>Không có sản phẩm mới!</h1>: <ProductList data={newsp} />}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Home;

import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/product-details.css";
// eslint-disable-next-line
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const { MASP, TENSP, NUOCSX, DONGIA, HINHANH, MOTA } = product;
  product.DONGIA = Number(product.DONGIA)

  useEffect(() => {
    const params = new URLSearchParams();
    params.append("KEY", String(id));

    axios
      .post("http://localhost:8080/SanPham/GetList", params)
      .then(function (response) {
        setProduct(response.data.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        MASP,
        TENSP,
        DONGIA,
        HINHANH,
      })
    );
  };


  return (
    <Helmet title="Chi tiết sản phẩm">
      <CommonSection />
      <section className="pt-0">
        <Container>
          <Row>
            <Col md="5">
              <img src={HINHANH} />
            </Col>
            <Col md='5' className="pt-2">
              <div className="product__details">
                <p>{NUOCSX}</p>
                <h2 className="mt-1">{TENSP}</h2>
                <h4 className="mt-2">{DONGIA} đ</h4>
                <p className="mt-4">{MOTA}</p>
                <button className="add__btn" onClick={addToCart}>Thêm vào giỏ hàng</button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetail;

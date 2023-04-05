import React from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import '../styles/checkout.css'
import { useSelector } from "react-redux";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import "../styles/product-details.css";
import "../App.css";
const Checkout = () => {

  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const total = useSelector(state=>state.cart.totalAmount)

  return (
    <Helmet title="Thanh toán">
      <CommonSection title="Thanh toán"/>
      <section className="pt-4">
        <Container>
          <Row>
            <Col lg="7">
              <h6 className="mb-4 fw-bold fs-4">Thông tin thanh toán</h6>
              <Form className="billing__form">
                <FormGroup className="form__group">
                  <input type="text" placeholder="Họ tên"/>  
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="tel" placeholder="Số điện thoại"/>  
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="email" placeholder="Email"/>  
                </FormGroup>
                <FormGroup className="form__group">
                  <input type="text" placeholder="Địa chỉ"/>  
                </FormGroup>
              </Form>
            </Col>
            <Col lg="3">
              <div className="checkout__cart">
                <h4>Tổng số lượng: <span>{totalQuantity}</span></h4>
                <h4>Tạm tính: <span>{total}đ</span></h4>
                <h4>Phí giao hàng: <span>0đ</span></h4>
                <h6>Tổng tiền: <span>{total}đ</span></h6>
                <button className="w-100 order__btn">Đặt hàng</button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;

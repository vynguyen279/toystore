import React from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import "../styles/checkout.css";
import { useSelector, useDispatch } from "react-redux";
import Helmet from "../components/Helmet/Helmet";
import { getInfo, addOrder, addDetailOrder } from "../server/callAPI";
import CommonSection from "../components/UI/CommonSection";
import "../styles/product-details.css";
import "../App.css";
import { useState } from "react";
import { useEffect } from "react";
const Checkout = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const total = useSelector((state) => state.cart.totalAmount);
  const cart = useSelector((state) => state.cart.cartItems)

  const [name, setName] = useState("");
  const [sdt, setSDT] = useState("");
  const [email, setEmail] = useState("");
  const [dc, setDc] = useState("");
  const [ma, setMa] = useState("");

  useEffect(()=>{
    getInfoByEmail()
  }, [])

  const getInfoByEmail = () => {
    if (localStorage.getItem("username")) {
      getInfo({ EMAIL: localStorage.getItem("username") })
        .then(function (response) {
          if (response.data.status) {
            setName(response.data.data[0].HOTEN);
            setEmail(response.data.data[0].EMAIL);
            setDc(response.data.data[0].DIACHI);
            setSDT(response.data.data[0].SDT);
            setMa(response.data.data[0].MAKH);
          } else {
            alert("Không tìm thấy thông tin khách hàng!");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else return;
  };

  // const addDetailOrder = (MSDDH) => {
  //   // console.log(cart)
  //   cart.map((item) => {
  //     let dataDetail = {
  //       MSDDH: MSDDH,
  //       MASP: item.MASP,
  //       SL: item.quantity,
  //     };
  //     addDetailOrder(dataDetail)
  //       .then(function (res) {
  //         if (res.data.status) {
  //           console.log(res.data.data);
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   });
  //   // deleteCart();
  // };

  const addOrderKH = (e) => {
    e.preventDefault()
    let data = {
      MAKH: ma,
      TRANGTHAI: "Chờ xác nhận",
    };
    addOrder(data)
      .then(function (response) {
        if (response.data.status) {
          // addDetailOrder(response.data.data[0].MSDDH);
          cart.map((item) => {
            let dataDetail = {
              MSDDH: response.data.data[0].MSDDH,
              MASP: item.MASP,
              SL: parseInt(item.quantity),
            };
            addDetailOrder(dataDetail)
              .then(function (res) {
                if (res.data.status) {
                  // console.log(res.data.data);
                }
                else{
                  alert("Đặt đơn thất bại!")
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          });
          alert("Đặt hàng thành công!")
        } else {
          alert(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Helmet title="Thanh toán">
      <CommonSection title="Thanh toán" />
      <section className="pt-4">
        <Container>
          <Row>
            <Col lg="7">
              <h6 className="mb-4 fw-bold fs-4">Thông tin thanh toán</h6>
              <Form className="billing__form">
                <label htmlFor="">Họ tên</label>
                <FormGroup className="form__group">
                  <input type="text" value={name} disabled />
                </FormGroup>
                <label htmlFor="">Số điện thoại</label>
                <FormGroup className="form__group">
                  <input type="tel" value={sdt} disabled />
                </FormGroup>
                <label htmlFor="">Email</label>
                <FormGroup className="form__group">
                  <input type="email" value={email} disabled />
                </FormGroup>
                <label htmlFor="">Địa chỉ</label>
                <FormGroup className="form__group">
                  <input type="text" value={dc} disabled />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="3">
              <div className="checkout__cart">
                <h4>
                  Tổng số lượng: <span>{totalQuantity}</span>
                </h4>
                <h4>
                  Tạm tính: <span>{total}đ</span>
                </h4>
                <h4>
                  Phí giao hàng: <span>0đ</span>
                </h4>
                <h6>
                  Tổng tiền: <span>{total}đ</span>
                </h6>
                <button onClick={addOrderKH} className="w-100 order__btn">
                  Đặt hàng
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;

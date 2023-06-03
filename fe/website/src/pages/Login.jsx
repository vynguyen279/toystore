import React, { useState, useEffect } from "react";
import { signIn } from "../server/callAPI";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import "../styles/login.css";
import isEmpty from "validator/lib/isEmpty";
import login from "../assets/login.svg";
import {
  listCart,
  getInfo,
  resetMK,
  sendEmail,
  getTK,
} from "../server/callAPI";
import { Link } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import "../styles/product-details.css";
import "../App.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const history = useNavigate();
  const cartProducts = useSelector((state) => state.cart.cartItems);
  const [emailSend, setEmailSend] = useState("");
  const [showEmailSend, setShowEmailSend] = useState(false);
  const [err1, setErr2] = useState("");
  const handleCloseEmail = () => setShowEmailSend(false);
  const handleShowEmail = () => setShowEmailSend(true);
  // const total = useSelector(state => state.cart.totalAmount)
  // console.log(total.toLocaleString("it-IT", {
  //   style: "currency",
  //   currency: "VND",
  // }))

  const dispatch = useDispatch();

  const [err, setErr] = useState("");

  const isValidate = () => {
    const err = {};

    if (isEmpty(pass)) err.pass = "Vui lòng nhập mật khẩu!";

    if (!username.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
      err.email = "Email không hợp lệ. Vui lòng nhập lại!";
    if (isEmpty(username)) err.username = "Vui lòng nhập email!";

    setErr(err);
    if (Object.keys(err).length > 0) return false;
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const isValid = isValidate();
    if (isValid) {
      const data = {
        TAIKHOAN: username,
        MATKHAU: pass,
      };
      // console.log(data)
      signIn(data)
        .then(function (response) {
          if (response.data.status) {
            // localStorage.removeItem('isAuth')
            localStorage.setItem("isAuth", true);
            localStorage.setItem("username", username);
            localStorage.setItem("pass", pass);
            alert("Đăng nhập thành công!");
            getTK({ EMAIL: username })
              .then(function (response) {
                if (response.data.status) {
                  localStorage.setItem("role", response.data.data[0].CHUCVU);
                  if (response.data.data[0].CHUCVU.includes("khachhang")) {

                    history("/shop", { replace: true });
                    getListCart();
                  } else {
                    history("/admin/customer", { replace: true });
                    window.location.reload()
                  }
                } else alert(response.data.data);
              })
              .catch(function (error) {
                console.log(error);
              });
          } else alert(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else return;
  };

  const incrementItem = (item) => {
    dispatch(cartActions.addItem(item));
  };

  const addAll = (item, count) => {
    if (cartProducts.some((value) => value.MASP == item.MASP)) {
      for (var i = 1; i <= count; i++) {
        incrementItem(item);
      }
    } else {
      incrementItem(item);
      for (var i = 1; i < count; i++) {
        incrementItem(item);
      }
    }
  };

  const getListCart = () => {
    if (window.localStorage.getItem("isAuth")) {
      getInfo({ EMAIL: window.localStorage.getItem("username") })
        .then(function (response) {
          if (response.data.status)
            listCart({ MAKH: response.data.data[0].MAKH })
              .then(function (response) {
                if (response.data.status) {
                  for (var i = 0; i < response.data.data.length; i++) {
                    const count = response.data.data[i].SOLUONG;
                    const item = {
                      MASP: response.data.data[i].MASP,
                      TENSP: response.data.data[i].TENSP,
                      DONGIA: String(response.data.data[i].DONGIA),
                      SALE: String(response.data.data[i].SALE),
                      HINHANH: response.data.data[i].HINHANH,
                    };
                    addAll(item, count);
                  }
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          // console.log(response.data.data[0].MAKH);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const isValidate2 = () => {
    const err = {};
    // if (isEmpty(email)) err.email = "Vui lòng nhập email!";
    if (isEmpty(emailSend)) err.email = "Vui lòng nhập email!";
    // if (!emailSend.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
    //   err.email = "Email không hợp lệ. Vui lòng nhập lại!";
    setErr2(err);
    if (Object.keys(err).length > 0) return false;
    return true;
  };

  const handleReset = (e) => {
    e.preventDefault();
    const isValid = isValidate2();
    if (isValid) {
      console.log(emailSend);
      resetMK({ EMAIL: emailSend })
        .then(function (response) {
          if (response.data.status) {
            sendEmail({ EMAIL: emailSend, mess: response.data.data })
              .then(function (response) {
                if (response.data.status) {
                  alert(String(response.data.data));
                } else alert("Thất bại!");
              })
              .catch(function (error) {
                console.log(error);
              });
          } else alert(String(response.data.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    } else return;
  };

  return (
    <Helmet title="Đăng nhập">
      <section className="mt-1">
        <Container>
          <Row className="justify-content-center">
            <Col lg="5">
              <img src={login} />
            </Col>
            <Col lg="4" className="mt-1">
              <h3 className="fw-bold fs-4 mb-4 text-center">Đăng nhập</h3>
              <Form onSubmit={handleLogin}>
                <FormGroup>
                  <Label for="username">Tên đăng nhập</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Tên đăng nhập"
                  />
                  <p className="err">{err.username}</p>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Mật khẩu</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="Mật khẩu"
                  />
                  <p className="err">{err.pass}</p>
                </FormGroup>
                <div className="out-input">
                  <button type="submit" className="btn-login">
                    Đăng nhập
                  </button>
                  <p className="text-center">
                    Chưa có tài khoản? <Link to="/signup">Đăng ký</Link>
                  </p>
                  <a
                    className="text-center"
                    style={{ cursor: "pointer", marginLeft: "30%" }}
                    onClick={handleShowEmail}
                  >
                    Quên mật khẩu?
                  </a>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
        <div className="model_box">
          <Modal
            isOpen={showEmailSend}
            onHide={showEmailSend}
            backdrop="static"
            keyboard={false}
          >
            <ModalHeader closeButton></ModalHeader>
            <form onSubmit={handleReset}>
              <div class="form-group mt-3">
                <label htmlFor="">Email</label>
                <input
                  onChange={(e) => setEmailSend(e.target.value)}
                  type="email"
                  class="form-control"
                  id="anh"
                  placeholder="Nhập email"
                />
                <p className="err">{err1.email}</p>
              </div>

              <button type="submit" class="btn btn-success mt-4 center">
                Gửi
              </button>
            </form>

            <ModalFooter>
              <Button variant="secondary" onClick={handleCloseEmail}>
                Close
              </Button>
            </ModalFooter>
          </Modal>

          {/* Model Box Finsihs */}
        </div>
      </section>
    </Helmet>
  );
};
export default Login;

// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import { signIn } from "../server/callAPI";
import {useNavigate  } from 'react-router-dom'
// eslint-disable-next-line
import { Container, Row, Col, Form, FormGroup, Input, Label } from "reactstrap";
import "../styles/login.css";
import isEmpty from "validator/lib/isEmpty";
// eslint-disable-next-line
import login from "../assets/login.svg";
import Shop from "./Shop";
// eslint-disable-next-line
import { Link, useHistory } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import "../styles/product-details.css";
import "../App.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const history = useNavigate()

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
            localStorage.removeItem('isAuth')
            localStorage.setItem('isAuth', true)
            alert("Đăng nhập thành công!");
            history('/shop')
          } else alert("failed");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else return
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
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
export default Login;

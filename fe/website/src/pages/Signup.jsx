import React, {useState } from "react";
import { Container, Row, Col, Form, FormGroup, Input, Label } from "reactstrap";
import {useNavigate  } from 'react-router-dom'
import "../styles/login.css";
import hello from "../assets/hello.svg";
import { signUp } from "../server/callAPI";
import isEmpty from "validator/lib/isEmpty";
import { Link } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet";
import "../styles/product-details.css";
import checkRole from "../components/checkRole";
import "../App.css";
const Signup = () => {
  checkRole()
  // eslint-disable-next-line
  const [err, setErr] = useState("");
  const history = useNavigate()

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [sdt, setSdt] = useState("");
  const [ten, setTen] = useState("");
  const [dc, setDc] = useState("");
  const [ngaySinh, setNgaySinh] = useState("");
  const [gt, setGt] = useState(true);

  const isValidate = () => {
    const err = {};
    // if (isEmpty(email)) err.email = "Vui lòng nhập email!";
    if (isEmpty(ten)) err.ten = "Vui lòng nhập họ tên!";
    if (isEmpty(pass)) err.pass = "Vui lòng nhập mật khẩu!";
    if (pass.length<8) err.pass2 = "Mật khẩu phải từ 8 kí tự trở lên!";
    if (isEmpty(rePass)) err.rePass = "Vui lòng nhập lại mật khẩu!";
    if (isEmpty(ngaySinh)) err.ngaySinh = "Vui lòng nhập ngày sinh!";
    if (isEmpty(sdt)) err.sdt = "Vui lòng nhập số điện thoại!";
    if (isEmpty(dc)) err.dc = "Vui lòng nhập địa chỉ!";
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) err.email = "Email không hợp lệ. Vui lòng nhập lại!";
    if (isEmpty(email)) err.email = "Vui lòng nhập email!";
    if(rePass!=pass) err.rePass = "Mật khẩu không khớp!";

    setErr(err);
    if (Object.keys(err).length > 0) return false;
    return true;
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const isValid = isValidate();
    if (isValid) {
      let data = {
        HOTEN: ten,
        DIACHI: dc,
        SDT: sdt,
        EMAIL: email,
        NGAYSINH: ngaySinh,
        GIOITINH: JSON.parse(gt),
        MATKHAU: pass,
      };

      // console.log(data);
      signUp(data)
        .then(function (response) {
          if (response.data.status === true) {
            alert("Đăng ký thành công!");
            localStorage.setItem('isAuth', false)
            history('/login')
            setTen("");
            setDc("");
            setSdt("");
            setEmail("");
            setNgaySinh("");
            setRePass("");
            setGt(true);
            setPass("");
          } else alert("Email này đã được đăng ký!");
        })
        .catch(function (error) {
          alert("Đăng ký thất bại!");
        });
    } else return;
  };

  return (
    <Helmet title="Đăng ký">
      <section className="mt-1">
        <Container>
          <Row className="justify-content-center">
            <Col lg="5">
              <img src={hello} />
            </Col>
            <Col lg="5" className="mt-0">
              <h3 className="fw-bold fs-4 mb-4 text-center">Đăng ký</h3>
              <Form onSubmit={handleSignUp}>
                <FormGroup>
                  <Label for="hoten">Họ tên</Label>
                  <Input
                    type="text"
                    name="hoten"
                    id="hoten"
                    value={ten}
                    onChange={(e) => setTen(e.target.value)}
                    placeholder="Họ tên"
                  />
                  <p
                    className="err"
                  >{err.ten}</p>
                </FormGroup>
                <FormGroup>
                  <Label for="tel">Số điện thoại</Label>
                  <Input
                    type="tel"
                    name="tel"
                    id="tel"
                    value={sdt}
                    onChange={(e) => setSdt(e.target.value)}
                    placeholder="Số điện thoại"
                  />
                  <p
                    className="err"
                  >{err.sdt}</p>
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                  <p
                    className="err"
                  >{err.email}</p>
                </FormGroup>
                <FormGroup>
                  <Label for="diachi">Địa chỉ</Label>
                  <Input
                    type="text"
                    name="diachi"
                    id="diachi"
                    value={dc}
                    onChange={(e) => setDc(e.target.value)}
                    placeholder="Địa chỉ"
                  />
                  <p
                    className="err"
                  >{err.dc}</p>
                </FormGroup>
                <FormGroup>
                  <Label for="diachi">Ngày sinh</Label>
                  <Input
                    type="date"
                    name="ngaysinh"
                    id="ngaysinh"
                    value={ngaySinh}
                    onChange={(e) => setNgaySinh(e.target.value)}
                    placeholder="Ngày sinh"
                  />
                  <p
                    className="err"
                  >{err.ngaySinh}</p>
                </FormGroup>
                <FormGroup style={{ display: "flex", flexDirection: "column" }}>
                  <Label for="diachi">Giới tính</Label>
                  <div>
                    <Input
                      type="radio"
                      name="gt"
                      id="gt"
                      value="true"
                      checked='true'
                      onChange={(e) => setGt(e.target.value)}
                    />
                    Nam
                    <Input
                      style={{ marginLeft: 20 }}
                      type="radio"
                      name="gt"
                      id="gt"
                      value="false"
                      onChange={(e) => setGt(e.target.value)}
                    />
                    Nữ
                  </div>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Mật khẩu</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="Mật khẩu"
                  />
                  <p
                    className="err"
                  >{err.pass}</p>
                  <p
                    className="err"
                  >{err.pass2}</p>
                </FormGroup>
                <FormGroup>
                  <Label for="repassword">Nhập lại mật khẩu</Label>
                  <Input
                    type="password"
                    name="repassword"
                    id="repassword"
                    value={rePass}
                    onChange={(e) => setRePass(e.target.value)}
                    placeholder="Nhập lại mật khẩu"
                  />
                  <p
                    className="err"
                  >{err.rePass}</p>
                </FormGroup>
                <div className="out-input mt-2">
                  <button type="submit" className="btn-login">
                    Tạo tài khoản
                  </button>
                  <p className="text-center">
                    Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
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

export default Signup;

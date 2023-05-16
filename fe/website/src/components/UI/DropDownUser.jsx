import React, { useState, useEffect } from "react";
import { searchCustomer, updateCustomer, changePassword } from "../../server/callAPI";
import {useNavigate  } from 'react-router-dom'
import isEmpty from "validator/lib/isEmpty";
import {Login} from '../../pages/Login'
import moment from 'moment'
import '../../App.css'
import {
  Button,
  Modal,
  ModalFooter,
} from "reactstrap";
import "../../styles/dropdown-user.css";

const DropDownUser = () => {
  const history = useNavigate()
  const [ten, setTen] = useState("");
  const [ma, setMa] = useState("");
  const [ngaySinh, setNgaySinh] = useState(new Date());
  const [sdt, setSdt] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [rePass, setRePass] = useState("");
  const [dc, setDC] = useState("");
  const [gt, setGt] = useState(false);
  

  const [err, setErr] = useState("");
  const [err2, setErr2] = useState("");

  const [showEditPass, setShowEditPass] = useState(false);
  const [showEditInfo, setShowEditInfo] = useState(false);

  const handleClosePass = () => {
    setShowEditPass(false)
    setErr2('')
    setRePass('')
    setPass('')
    setNewPass('')
  };
  const handleCloseInfo = () => setShowEditInfo(false);

  const handleShowPass = () => setShowEditPass(true);

  const handleShowInfo = () => setShowEditInfo(true);

  useEffect(() => {
    search();
  }, []);

  const isValidate = () => {
    const err = {};
    // if (isEmpty(email)) err.email = "Vui lòng nhập email!";
    if (isEmpty(ten)) err.ten = "Vui lòng nhập họ tên!";
    if (isEmpty(sdt)) err.sdt = "Vui lòng nhập số điện thoại!";
    if (isEmpty(dc)) err.dc = "Vui lòng nhập địa chỉ!";
    if (isEmpty(email)) err.email = "Vui lòng nhập email!";
    if (isEmpty(ngaySinh)) err.ngaySinh = "Vui lòng nhập ngày sinh!";
    if (isEmpty(email)) err.email = "Vui lòng nhập email!";

    setErr(err);
    if (Object.keys(err).length > 0) return false;
    return true;
  };

  const isValidate2 = () => {
    const err = {}
    const userpass = localStorage.getItem('pass').split(" ").join("").trim()
    if (isEmpty(pass)) err.pass = "Vui lòng nhập mật khẩu!";
    if (pass!==userpass) err.pass = "Sai mật khẩu!";
    if (isEmpty(rePass)) err.rePass = "Vui lòng nhập lại mật khẩu mới!";
    if (isEmpty(newPass)) err.newPass = "Vui lòng nhập mật khẩu mới!";
    if(rePass!==newPass) err.rePass = "Mật khẩu không khớp!"

    setErr2(err);
    if (Object.keys(err).length > 0) return false;
    return true;
  };



  const handleEditInfo = (e) => {
    // setShowEditInfo(false)
    e.preventDefault();
    const isValid = isValidate();
    if(isValid){
    const data = {
      MAKH: ma,
      HOTEN: ten,
      SDT: sdt,
      DIACHI: dc,
      EMAIL: email,
      NGAYSINH: moment(ngaySinh).format('yyyy-MM-DD'),
      GIOITINH: JSON.parse(gt),
    };
    updateCustomer(data)
      .then(function (response) {
        if (response.data.status) alert("Cập nhật thông tin thành công!");
        setShowEditInfo(false)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else return
  };

  const handleEditPass= (e) => {

    e.preventDefault();
    const isValid = isValidate2();
    // console.log(isValid)
    if(isValid){
    const data = {
      EMAIL: email,
      MATKHAUMOI: rePass
    };

    changePassword(data)
      .then(function (response) {
        if (response.data.status) alert("Đổi mật khẩu thành công!");
        setShowEditPass(false)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else return
  };

  const handleShowSignOut= (e) => {

    e.preventDefault();
    localStorage.setItem('username', '')
    localStorage.setItem('pass', '')
    localStorage.setItem('isAuth', false)
    history('/Login')
    window.location.reload()
    // alert('Đã đăng xuất!')
  };

  const search = () => {
    const data = {
      KEY: localStorage.getItem("username"),
    };
    searchCustomer(data)
      .then(function (response) {
        setTen(response.data.data[0].HOTEN);
        setMa(response.data.data[0].MAKH);
        setSdt(response.data.data[0].SDT);
        setEmail(response.data.data[0].EMAIL);
        setDC(response.data.data[0].DIACHI);
        setNgaySinh(moment(new Date(response.data.data[0].NGAYSINH)).format('yyyy-MM-DD'));
        setGt(JSON.parse(response.data.data[0].GIOITINH));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="dropdown-container">
        <ul className="dropdown-list">
          <li onClick={handleShowInfo}>
            <a onClick={search}>Thay đổi thông tin</a>
          </li>
          <li onClick={handleShowPass}>
            <a>Đổi mật khẩu</a>
          </li>
          <li>
            <a onClick={handleShowSignOut}>Đăng xuất</a>
          </li>
        </ul>
      </div>
      <div className="model_box">
        <Modal
          isOpen={showEditInfo}
          onHide={showEditInfo}
          backdrop="static"
          keyboard={false}
        >
          {/* <ModalHeader closeButton></ModalHeader> */}
          <form onSubmit={handleEditInfo}>
            <div class="form-group">
              <label htmlFor="">Họ tên khách hàng</label>
              <input
                onChange={(e) => setTen(e.target.value)}
                type="text"
                value={ten}
                class="form-control"
                id="ten"
                placeholder="Nhập họ tên"
              />
              <p className="err">{err.ten}</p>
            </div>
            <div class="form-group mt-3">
              <label htmlFor="">SĐT</label>
              <input
                onChange={(e) => setSdt(e.target.value)}
                value={sdt}
                type="tel"
                class="form-control"
                id="sdt"
                placeholder="Nhập số điện thoại"
              />
              <p className="err">{err.sdt}</p>
            </div>
            <div class="form-group mt-3">
              <label htmlFor="">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                class="form-control"
                id="email"
                placeholder="Nhập email"
              />
              <p className="err">{err.email}</p>
            </div>
            <div class="form-group mt-3">
              <label htmlFor="">Địa chỉ</label>
              <textarea
                onChange={(e) => setDC(e.target.value)}
                value={dc}
                class="form-control"
                id="dc"
                placeholder="Nhập đại chỉ"
              />
              <p className="err">{err.dc}</p>
            </div>
            <div class="form-group mt-3">
              <label htmlFor="">Ngày sinh</label>
              <input
                onChange={(e) => setNgaySinh(e.target.value)}
                value={ngaySinh}
                type="date"
                class="form-control"
                id="ngaySinh"
                
                placeholder="Nhập ngày sinh"
              />
              <p className="err">{err.ngaySinh}</p>
            </div>
            <div class="form-group mt-3">
              <input
                type="radio"
                name="gender"
                value="false"
                // checked={gt ? false : true}
                // {...(gt && { checked: false })}
                checked={JSON.parse(gt) === false? true:false}
                style={{ marginRight: 10 }}
                onChange={(e)=>{setGt(e.target.value)}}
              />
              Nữ
              <input
                style={{ marginLeft: 20 }}
                type="radio"
                name="gender"
                value='true'
                // checked={gt ? true : false}
                checked={JSON.parse(gt) === true? true:false}
                onChange={(e)=>{setGt(e.target.value)}}
              />
              Nam
            </div>

            <button type="submit" class="btn btn-success mt-4 center">
              Cập nhật
            </button>
          </form>

          <ModalFooter>
            <Button variant="secondary" onClick={handleCloseInfo}>
              Close
            </Button>
          </ModalFooter>
        </Modal>

        {/* Model Box Finsihs */}
      </div>

      <div className="model_box">
        <Modal
          isOpen={showEditPass}
          onHide={showEditPass}
          backdrop="static"
          keyboard={false}
        >
          {/* <ModalHeader closeButton></ModalHeader> */}
          <form onSubmit={handleEditPass}>
            <div class="form-group">
              <label htmlFor="">Email</label>
              <input
                type="text"
                value={email}
                class="form-control"
                id="ten"
                disabled
                placeholder="Nhập họ tên"
              />
            </div>
            <div class="form-group mt-3">
              <label htmlFor="">Mật khẩu cũ</label>
              <input
                onChange={(e) => setPass(e.target.value.split(" ").join("").trim())}
                value={pass}
                type="password"
                class="form-control"
                id="sdt"
                placeholder="Nhập mật khẩu cũ"
              />
              <p className="err">{err2.pass}</p>
            </div>
            <div class="form-group mt-3">
              <label htmlFor="">Mật khẩu mới</label>
              <input
                onChange={(e) => setNewPass(e.target.value.split(" ").join(""))}
                value={newPass}
                type="password"
                class="form-control"
                id="email"
                placeholder="Nhập mật khẩu mới"
              />
              <p className="err">{err2.newPass}</p>
            </div>
            <div class="form-group mt-3">
              <label htmlFor="">Nhập lại mật khẩu mới</label>
              <input
                onChange={(e) => setRePass(e.target.value.split(" ").join(""))}
                value={rePass}
                type="password"
                class="form-control"
                id="email"
                placeholder="Nhập lại mật khẩu mới"
              />
              <p className="err">{err2.rePass}</p>
            </div>

            <button type="submit" class="btn btn-success mt-4 center">
              Cập nhật
            </button>
          </form>

          <ModalFooter>
            <Button variant="secondary" onClick={handleClosePass}>
              Close
            </Button>
          </ModalFooter>
        </Modal>

        {/* Model Box Finsihs */}
      </div>

      
    </div>
  );
};

export default DropDownUser;

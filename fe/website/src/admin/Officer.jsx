// import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState, useEffect } from "react";
import isEmpty from "validator/lib/isEmpty";
import "./style/form.css";
import moment from "moment";
import "../App.css";
import {
  addOfficer,
  getListOfficer,
  deleteOfficer,
  updateOfficer,
  imgUpload,
} from "../server/callAPI";
import {
  Button,
  Modal,
  Input,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";

const Officer = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [ten, setTen] = useState("");
  const [ten2, setTen2] = useState("");
  const [ma, setMa] = useState("");
  const [sdt, setSdt] = useState("");
  const [ngayLam, setNgayLam] = useState("");
  var [anh, setAnh] = useState("");
  const [email, setEmail] = useState("");
  const [dc, setDC] = useState("");
  const [ngaySinh, setNgaySinh] = useState("");
  const [gt, setGt] = useState(false);
  const [tt, setTt] = useState(false);

  const [sdt2, setSdt2] = useState("");
  const [ngayLam2, setNgayLam2] = useState("");
  var [anh2, setAnh2] = useState("");
  const [email2, setEmail2] = useState("");
  const [dc2, setDC2] = useState("");
  const [ngaySinh2, setNgaySinh2] = useState("");
  const [gt2, setGt2] = useState(false);
  const [tt2, setTt2] = useState(false);

  const [err, setErr] = useState("");
  const [err2, setErr2] = useState("");

  const [officers, setOfficers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let data = {
      KEY: query,
    };

    getListOfficer(data)
      .then(function (response) {
        // console.log(response.data.data);
        setOfficers(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [query]);

  useEffect(() => {
    let data = {
      KEY: query,
    };

    getListOfficer(data)
      .then(function (response) {
        // console.log(response.data.data);
        setOfficers(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [officers]);

  const handleSearch = (e) => {
    const searchItem = e.target.value;
    console.log(searchItem);
    setQuery(searchItem);
  };

  async function handleImg(e) {
    anh = await imgUpload(e.target.files[0]);
    setAnh(anh);
  }

  async function handleImg2(e) {
    anh2 = await imgUpload(e.target.files[0]);
    setAnh2(anh2);
  }

  const isValidate = () => {
    const err = {};
    // if (isEmpty(email)) err.email = "Vui lòng nhập email!";
    if (isEmpty(ten)) err.ten = "Vui lòng nhập họ tên!";
    if (isEmpty(sdt)) err.sdt = "Vui lòng nhập số điện thoại!";
    if (isEmpty(dc)) err.dc = "Vui lòng nhập địa chỉ!";
    if (isEmpty(ngaySinh)) err.ngaySinh = "Vui lòng nhập ngày sinh!";
    if (isEmpty(ngayLam)) err.ngayLam = "Vui lòng nhập ngày vào làm!";
    // if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
    // err.email = "Email không hợp lệ!";
    if (
      !sdt.match(
        /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
      )
    )
      err.sdt = "Số điện thoại không hợp lệ!";
    if (isEmpty(email)) err.email = "Vui lòng nhập email!";

    setErr(err);
    if (Object.keys(err).length > 0) return false;
    return true;
  };

  const isValidate2 = () => {
    const err = {};
    // if (isEmpty(email)) err.email = "Vui lòng nhập email!";
    if (isEmpty(ten2)) err.ten = "Vui lòng nhập họ tên!";
    if (isEmpty(sdt2)) err.sdt = "Vui lòng nhập số điện thoại!";
    if (isEmpty(dc2)) err.dc = "Vui lòng nhập địa chỉ!";
    if (isEmpty(email2)) err.email = "Vui lòng nhập email!";
    if (isEmpty(ngaySinh2)) err.ngaySinh = "Vui lòng nhập ngày sinh!";
    // if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))
    // err.email = "Email!";
    if (
      !sdt2.match(
        /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
      )
    )
      err.sdt = "Số điện thoại không hợp lệ!";
    if (isEmpty(email2)) err.email = "Vui lòng nhập email!";

    setErr2(err);
    if (Object.keys(err).length > 0) return false;
    return true;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const isValid = isValidate();
    if (isValid) {
      const data = {
        HOTEN: ten,
        SDT: sdt,
        NGAYVAOLAM: ngayLam,
        HINHANH: anh,
        EMAIL: email,
        DIACHI: dc,
        NGAYSINH: ngaySinh,
        TRANGTHAI: JSON.parse(tt),
        GIOITINH: JSON.parse(gt),
      };
      console.log(data);
      addOfficer(data)
        .then((rs) => {
          if (rs.data.status) alert("Thêm thành công");
          console.log(rs);
        })
        .catch(function (error) {
          alert("Thêm thất bại!");
        });
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const isValid = isValidate2();
    if (isValid) {
      const data = {
        MANV: ma,
        HOTEN: ten2,
        SDT: sdt2,
        NGAYVAOLAM: ngayLam2,
        HINHANH: anh2,
        EMAIL: email2,
        DIACHI: dc2,
        NGAYSINH: ngaySinh2,
        TRANGTHAI: JSON.parse(tt2),
        GIOITINH: JSON.parse(gt2),
      };
      console.log(data);
      updateOfficer(data)
        .then((rs) => {
          if (rs.data.status) alert("Cập nhật thành công");
          setShowEdit(false);
        })
        .catch(function (error) {
          alert("Cập nhật thất bại!");
        });
    }
  };

  const confirm = (manv) => {
    var r = window.confirm("Bạn có muốn xóa nhân viên này?");
    if (r == true) {
      const data = {
        MANV: manv,
      };
      deleteOfficer(data)
        .then((rs) => {
          if (rs.data.status) {
            alert("Xóa thành công");
            setOfficers([]);
          }
        })
        .catch(function (error) {
          alert("Xóa thất bại!");
        });
    } else return;
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div class="container ">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div class="row">
          <div class="col-sm-3 mt-5 mb-1 text-gred">
            <div className="search">
              <input
                class="form-control mr-sm-2"
                type="search"
                onChange={handleSearch}
                placeholder="Tìm nhân viên"
                aria-label="Search"
              />
            </div>
          </div>
          <div
            class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: "green" }}
          >
            <h2>
              <b>Danh sách nhân viên</b>
            </h2>
          </div>
          <div
            class="col-sm-3 offset-sm-1 ml-4 mt-5 mb-4 text-gred"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button variant="primary" onClick={handleShow}>
              Thêm nhân viên
            </Button>
          </div>
        </div>
        <div class="row">
          <div class="table-responsive ">
            <table class="table table-striped table-hover table-bordered table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Hình ảnh</th>
                  <th>Mã nhân viên</th>
                  <th>Họ tên</th>
                  <th>Ngày sinh</th>
                  <th>SĐT</th>
                  <th>Email</th>
                  <th>Địa chỉ</th>
                  <th>Ngày vào làm</th>
                  <th>Giới tính</th>
                  <th>Trạng thái</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* <TableRow data={products}/> */}
                {officers?.map((item, index) => (
                  <tr key={item.MANV}>
                    <td>{index+1}</td>
                    <td>
                      <img src={item.HINHANH} />
                    </td>
                    <td>{item.MANV}</td>
                    <td>{item.HOTEN}</td>
                    <td>{item.NGAYSINH}</td>
                    <td>{item.SDT}</td>
                    <td>{item.EMAIL}</td>
                    <td>{item.DIACHI}</td>
                    <td>{item.NGAYVAOLAM}</td>
                    <td>{item.GIOITINH ? "Nam" : "Nữ"}</td>
                    <td>{item.TRANGTHAI ? "Đang làm việc" : "Đã nghỉ việc"}</td>
                    <td>
                      <i
                        class="fa-solid fa-pen-to-square"
                        style={{ marginRight: 10, color: "#0a1d37" }}
                        onClick={() => {
                          setShowEdit(true);
                          setTen2(item.HOTEN);
                          setMa(item.MANV);
                          // setAnh2(item.HINHANH);
                          setEmail2(item.EMAIL);
                          setSdt2(item.SDT);
                          setGt2(item.GIOITINH);
                          setTt2(item.TRANGTHAI);
                          setNgayLam2(item.NGAYVAOLAM);
                          setNgaySinh2(item.NGAYSINH);
                          setDC2(item.DIACHI);
                        }}
                      ></i>
                      <i
                        class="fa-solid fa-trash-can"
                        style={{ color: "#ff0000" }}
                        onClick={() => confirm(item.MANV)}
                        // onClick={confirm(item.MASP)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* <!--- Model ADD ---> */}
        <div className="model_box">
          <Modal
            isOpen={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <ModalHeader closeButton></ModalHeader>
            <form onSubmit={handleAdd}>
              <div class="form-group">
                <label htmlFor="">Họ tên Nhân viên</label>
                <input
                  onChange={(e) => setTen(e.target.value)}
                  type="text"
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
                  type="tel"
                  class="form-control"
                  id="sdt"
                  placeholder="Nhập số điện thoại"
                />
                <p className="err">{err.sdt}</p>
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Ngày vào làm</label>
                <input
                  onChange={(e) => setNgayLam(e.target.value)}
                  type="date"
                  class="form-control"
                  id="ngayLam"
                  placeholder="Nhập ngày vào làm"
                />
                <p className="err">{err.ngayLam}</p>
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Hình ảnh</label>
                <input
                  onChange={handleImg}
                  type="file"
                  class="form-control"
                  id="anh"
                  placeholder="Nhập link ảnh"
                />
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
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
                  name="work"
                  value="false"
                  style={{ marginRight: 10 }}
                  checked={JSON.parse(tt) === false ? true : false}
                  onChange={(e) => setTt(e.target.value)}
                />{" "}
                Đã nghỉ việc
                <input
                  style={{ marginLeft: 20 }}
                  type="radio"
                  name="work"
                  value="true"
                  checked={JSON.parse(tt) === true ? true : false}
                  onChange={(e) => setTt(e.target.value)}
                />{" "}
                Đang làm việc
              </div>
              <div class="form-group mt-3">
                <input
                  type="radio"
                  name="gender"
                  value="false"
                  checked={JSON.parse(gt) === false ? true : false}
                  style={{ marginRight: 10 }}
                  onChange={(e) => setGt(e.target.value)}
                />{" "}
                Nữ
                <input
                  style={{ marginLeft: 20 }}
                  type="radio"
                  name="gender"
                  value="true"
                  checked={JSON.parse(gt) === true ? true : false}
                  onChange={(e) => setGt(e.target.value)}
                />{" "}
                Nam
              </div>

              <button type="submit" class="btn btn-success mt-4 center">
                Thêm nhân viên
              </button>
            </form>

            <ModalFooter>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </ModalFooter>
          </Modal>

          {/* Model Box Finsihs */}
        </div>

        {/*  MODAL EDIT */}
        <div className="model_box">
          <Modal
            isOpen={showEdit}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <ModalHeader closeButton></ModalHeader>
            <form onSubmit={handleEdit}>
              <div class="form-group">
                <label htmlFor="">Họ tên Nhân viên</label>
                <input
                  onChange={(e) => setTen2(e.target.value)}
                  type="text"
                  class="form-control"
                  id="ten"
                  value={ten2}
                  placeholder="Nhập họ tên"
                />
                <p className="err">{err2.ten}</p>
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">SĐT</label>
                <input
                  onChange={(e) => setSdt2(e.target.value)}
                  type="tel"
                  value={sdt2}
                  class="form-control"
                  id="sdt"
                  placeholder="Nhập số điện thoại"
                />
                <p className="err">{err2.sdt}</p>
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Ngày vào làm</label>
                <input
                  onChange={(e) => setNgayLam2(e.target.value)}
                  type="text"
                  value={ngayLam2}
                  class="form-control"
                  id="ngayLam"
                  placeholder="Nhập ngày vào làm"
                />
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Hình ảnh</label>
                <input
                  onChange={handleImg2}
                  type="file"
                  class="form-control"
                  id="anh"
                  placeholder="Nhập link ảnh"
                />
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Email</label>
                <input
                  onChange={(e) => setEmail2(e.target.value)}
                  type="text"
                  class="form-control"
                  value={email2}
                  id="email"
                  placeholder="Nhập email"
                />
                <p className="err">{err2.email}</p>
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Địa chỉ</label>
                <textarea
                  onChange={(e) => setDC2(e.target.value)}
                  class="form-control"
                  id="dc"
                  value={dc2}
                  placeholder="Nhập đại chỉ"
                />
                <p className="err">{err2.dc}</p>
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Ngày sinh</label>
                <input
                  onChange={(e) => setNgaySinh2(e.target.value)}
                  type="tel"
                  value={ngaySinh2}
                  class="form-control"
                  id="ngaySinh"
                  placeholder="Nhập ngày sinh"
                />
                <p className="err">{err2.ngaySinh}</p>
              </div>
              <div class="form-group mt-3">
                <input
                  type="radio"
                  name="work"
                  value="false"
                  style={{ marginRight: 10 }}
                  checked={JSON.parse(tt2) === false ? true : false}
                  onChange={(e) => setTt2(e.target.value)}
                />{" "}
                Đã nghỉ việc
                <input
                  style={{ marginLeft: 10 }}
                  type="radio"
                  name="work"
                  value="true"
                  checked={JSON.parse(tt2) === true ? true : false}
                  onChange={(e) => setTt2(e.target.value)}
                />{" "}
                Đang làm việc
              </div>
              <div class="form-group mt-3">
                <input
                  type="radio"
                  name="gender"
                  value="false"
                  checked={JSON.parse(gt2) === false ? true : false}
                  style={{ marginRight: 10 }}
                  onChange={(e) => setGt2(e.target.value)}
                />{" "}
                Nữ
                <input
                  type="radio"
                  style={{ marginLeft: 10 }}
                  name="gender"
                  value="true"
                  checked={JSON.parse(gt2) === true ? true : false}
                  onChange={(e) => setGt2(e.target.value)}
                />{" "}
                Nam
              </div>
              <button type="submit" class="btn btn-success mt-4 center">
                Cập nhật
              </button>
            </form>

            <ModalFooter>
              <Button variant="secondary" onClick={() => setShowEdit(false)}>
                Close
              </Button>
            </ModalFooter>
          </Modal>

          {/* Model Box Finsihs */}
        </div>
      </div>
    </div>
  );
};

export default Officer;

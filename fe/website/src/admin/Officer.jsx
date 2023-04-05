// import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState, useEffect } from "react";
import "./style/form.css";
import {
  addOfficer,
  getListOfficer,
  deleteOfficer,
  updateOfficer,
  updateCustomer,
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
  const [anh, setAnh] = useState("");
  const [email, setEmail] = useState("");
  const [dc, setDC] = useState("");
  const [ngaySinh, setNgaySinh] = useState("");
  const [gt, setGt] = useState(false);
  const [tt, setTt] = useState(false);

  const [sdt2, setSdt2] = useState("");
  const [ngayLam2, setNgayLam2] = useState("");
  const [anh2, setAnh2] = useState("");
  const [email2, setEmail2] = useState("");
  const [dc2, setDC2] = useState("");
  const [ngaySinh2, setNgaySinh2] = useState("");
  const [gt2, setGt2] = useState(false);
  const [tt2, setTt2] = useState(false);

  const [officers, setOfficers] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let data = {
      KEY: query,
    };

    getListOfficer(data)
      .then(function (response) {
        console.log(response.data.data);
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
        console.log(response.data.data);
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

  const handleAdd = () => {
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
        if (rs.status) alert("Thêm thành công");
        console.log(rs);
      })
      .catch(function (error) {
        alert("Thêm thất bại!");
      });
  };

  const handleEdit = () => {
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
        if (rs.status) alert("Cập nhật thành công");
        console.log(rs);
      })
      .catch(function (error) {
        alert("Cập nhật thất bại!");
      });
  };

  //   const handleDelete = (masp) => {

  //   };

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
                    <td>{index}</td>
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
                          setAnh2(item.HINHANH);
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
            <form>
              <div class="form-group">
                <label htmlFor="">Họ tên Nhân viên</label>
                <input
                  onChange={(e) => setTen(e.target.value)}
                  type="text"
                  class="form-control"
                  id="ten"
                  placeholder="Nhập họ tên"
                />
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
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Ngày vào làm</label>
                <input
                  onChange={(e) => setNgayLam(e.target.value)}
                  type="text"
                  class="form-control"
                  id="ngayLam"
                  placeholder="Nhập ngày vào làm"
                />
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Hình ảnh</label>
                <input
                  onChange={(e) => setAnh(e.target.value)}
                  type="text"
                  class="form-control"
                  id="anh"
                  placeholder="Nhập link ảnh"
                />
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  class="form-control"
                  id="email"
                  placeholder="Nhập email"
                />
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Địa chỉ</label>
                <textarea
                  onChange={(e) => setDC(e.target.value)}
                  class="form-control"
                  id="dc"
                  placeholder="Nhập đại chỉ"
                />
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Ngày sinh</label>
                <input
                  onChange={(e) => setNgaySinh(e.target.value)}
                  type="tel"
                  class="form-control"
                  id="ngaySinh"
                  placeholder="Nhập ngày sinh"
                />
              </div>
              <div class="form-group mt-3">
                <input
                  type="radio"
                  name="work"
                  value="false"
                  style={{ marginRight: 10 }}
                  onChange={(e) => setTt(e.target.value)}
                />{" "}
                Đã nghỉ việc
                <input
                  type="radio"
                  name="work"
                  value="true"
                  checked={true}
                  onChange={(e) => setTt(e.target.value)}
                />{" "}
                Đang làm việc
              </div>
              <div class="form-group mt-3">
                <input
                  type="radio"
                  name="gender"
                  value="false"
                  style={{ marginRight: 10 }}
                  onChange={(e) => setGt(e.target.value)}
                />{" "}
                Nữ
                <input
                  type="radio"
                  name="gender"
                  value="true"
                  checked={true}
                  onChange={(e) => setGt(e.target.value)}
                />{" "}
                Nam
              </div>
              {/* <div class="form-group mt-3">
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Country"/>
                </div>
                <div class="form-group mt-3">
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Country"/>
                </div> */}

              <button
                type="submit"
                class="btn btn-success mt-4 center"
                onClick={handleAdd}
              >
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
            <form>
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
                  onChange={(e) => setAnh2(e.target.value)}
                  type="text"
                  value={anh2}
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
              </div>
              <div class="form-group mt-3">
                <input
                  type="radio"
                  name="work"
                  value="false"
                  style={{ marginRight: 10 }}
                  onChange={(e) => setTt2(e.target.value)}
                />{" "}
                Đã nghỉ việc
                <input
                  type="radio"
                  name="work"
                  value="true"
                  onChange={(e) => setTt2(e.target.value)}
                />{" "}
                Đang làm việc
              </div>
              <div class="form-group mt-3">
                <input
                  type="radio"
                  name="gender"
                  value="false"
                  style={{ marginRight: 10 }}
                  onChange={(e) => setGt2(e.target.value)}
                />{" "}
                Nữ
                <input
                  type="radio"
                  name="gender"
                  value="true"
                  onChange={(e) => setGt2(e.target.value)}
                />{" "}
                Nam
              </div>
              <button
                type="submit"
                class="btn btn-success mt-4 center"
                onClick={handleEdit}
              >
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

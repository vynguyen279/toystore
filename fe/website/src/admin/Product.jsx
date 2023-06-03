import isEmpty from "validator/lib/isEmpty";
import "./style/form.css";
import moment from "moment";
// import  uploadImg  from "../components/ImgUpload.js";
import "../App.css";

import React, { useState, useEffect } from "react";
import checkRole from "../components/checkRole";
import "./style/form.css";
import {
  addProduct,
  getListProduct,
  deleteProduct,
  updateProduct,
  getListType,
  imgUpload
} from "../server/callAPI";
import {
  Button,
  Modal,
  Input,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";

const Product = () => {
  checkRole()
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [ten, setTen] = useState("");
  const [type, setType] = useState([]);
  const [nuoc, setNuoc] = useState("");
  const [loai, setLoai] = useState("");
  const [gia, setGia] = useState("");
  const [mota, setMota] = useState("");
  const [soLuong, setSoLuong] = useState("");
  var [anh, setAnh] = useState("");
  const [sale, setSale] = useState("");
  const [trangThai, setTrangThai] = useState(false);

  const [ten2, setTen2] = useState("");
  const [masp, setMasp] = useState("");
  const [loai2, setLoai2] = useState("");
  const [nuoc2, setNuoc2] = useState("");
  const [gia2, setGia2] = useState("");
  const [mota2, setMota2] = useState("");
  const [soLuong2, setSoLuong2] = useState("");
  var [anh2, setAnh2] = useState("");
  const [sale2, setSale2] = useState("");
  const [trangThai2, setTrangThai2] = useState(false);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  const [err, setErr] = useState("");
  const [err2, setErr2] = useState("");

  useEffect(() => {
    let data = {
      KEY: query,
    };

    getListProduct(data)
      .then(function (response) {
        // console.log(response.data.data);
        setProducts(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [query]);

  useEffect(() => {
    let data = {
      KEY: query,
    };

    getListProduct(data)
      .then(function (response) {
        // console.log(response.data.data);
        setProducts(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });

  }, [products]);

  const handleSearch = (e) => {
    const searchItem = e.target.value;
    setQuery(searchItem);
  };

  const isValidate = () => {
    const err = {};
    // if (isEmpty(email)) err.email = "Vui lòng nhập email!";
    if (isEmpty(ten)) err.ten = "Vui lòng nhập tên sản phẩm!";
    if (isEmpty(nuoc)) err.nuoc = "Vui lòng nhập nước sản xuất!";
    if (isEmpty(gia)) err.gia = "Vui lòng nhập giá sản phẩm!";
    if (isEmpty(mota)) err.mt = "Vui lòng nhập mô tả sản phẩm!";
    if (isEmpty(soLuong)) err.sl = "Vui lòng nhập số lượng!";
    if (isEmpty(anh)) err.anh = "Vui lòng chọn ảnh sản phẩm!";
    if (isEmpty(sale)) err.sale = "Vui lòng nhập tỉ lệ sale!";
    if (!sale.match(/^(0(\.[0-9]{1,4})?|1(\.0{1,4})?)$/g))
      err.sale = "Tỉ lệ sale phải là số thập phân từ 0 đến 1!" + "\nvd: 0.15";
    if (!gia.match(/^[1-9][0-9]*$/g)) err.gia = "Giá không hợp lệ!";
    // if (!sdt.match(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/))
    // err.sdt = "Số điện thoại không hợp lệ!"

    setErr(err);
    if (Object.keys(err).length > 0) return false;
    return true;
  };

  const isValidate2 = () => {
    const err = {};
    // if (isEmpty(email)) err.email = "Vui lòng nhập email!";
    if (isEmpty(ten2)) err.ten = "Vui lòng nhập tên sản phẩm!";
    if (isEmpty(nuoc2)) err.nuoc = "Vui lòng nhập nước sản xuất!";
    if (isEmpty(anh2)) err.anh = "Vui lòng chọn ảnh sản phẩm!";
    if (isEmpty(String(gia2))) err.gia = "Vui lòng nhập giá sản phẩm!";
    if (isEmpty(mota2)) err.mt = "Vui lòng nhập mô tả sản phẩm!";
    if (isEmpty(String(soLuong2))) err.sl = "Vui lòng nhập số lượng!";
    if (isEmpty(String(sale2))) err.sale = "Vui lòng nhập tỉ lệ sale!";
    if (!String(sale2).match(/^(0(\.[0-9]{1,4})?|1(\.0{1,4})?)$/g))
      err.sale = "Tỉ lệ sale phải là số thập phân từ 0 đến 1!" + "\nvd: 0.15";
    if (!String(gia2).match(/^[1-9][0-9]*$/g)) err.gia = "Giá không hợp lệ!";

    setErr2(err);
    if (Object.keys(err).length > 0) return false;
    return true;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const isValid = isValidate();
    if (isValid) {
      const data = {
        TENSP: ten,
        LOAISP: loai,
        NUOCSX: nuoc,
        DONGIA: parseFloat(gia.trim()),
        MOTA: mota,
        SOLUONGTON: parseInt(soLuong),
        HINHANH: anh,
        SALE: parseFloat(sale),
        TRANGTHAIXOA: JSON.parse(trangThai),
      };
      // console.log(data);
      addProduct(data)
        .then((rs) => {
          if (rs.data.status) alert("Thêm thành công");
          
          // console.log(rs);
        })
        .catch(function (error) {
          alert("Thêm thất bại!");
        });
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const isValid = isValidate2();
    if (isValid) {
      const data = {
        MASP: masp,
        TENSP: ten2,
        LOAISP: loai2,
        NUOCSX: nuoc2,
        DONGIA: parseFloat(gia2),
        MOTA: mota2,
        SOLUONGTON: parseInt(soLuong2),
        // HINHANH: anh2,
        SALE: parseFloat(sale2),
        TRANGTHAIXOA: JSON.parse(trangThai2),
      };
      // console.log(data);
      updateProduct(data)
        .then((rs) => {
          if (rs.data.status) 
             alert("Cập nhật thành công");
          alert(rs.data.data)
          setShowEdit(false)
          // console.log(rs);
        })
        .catch(function (error) {
          alert("Cập nhật thất bại!");
        });
    }
  };

  async function handleImg(e) {
    anh = await imgUpload(e.target.files[0])
    setAnh(anh)
  };

  async function handleImg2(e) {
    anh2 = await imgUpload(e.target.files[0])
    setAnh2(anh2)
  };

  const confirm = (masp) => {
    var r = window.confirm("Bạn có muốn xóa sản phẩm này?");
    if (r == true) {
      const data = {
        MASP: masp,
      };
      deleteProduct(data)
        .then((rs) => {
          if (rs.data.status) {
            alert("Xóa thành công");
            setProducts([]);
          }
          else{
            alert(rs.data.data)
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
                placeholder="Tìm sản phẩm"
                aria-label="Search"
              />
            </div>
          </div>
          <div
            class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: "green" }}
          >
            <h2>
              <b>Danh sách sản phẩm</b>
            </h2>
          </div>
          <div
            class="col-sm-3 offset-sm-1 ml-4 mt-5 mb-4 text-gred"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button variant="primary" onClick={handleShow}>
              Thêm sản phẩm
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
                  <th>Mã sản phẩm</th>
                  <th>Tên sản phẩm</th>
                  <th>Loại sản phẩm</th>
                  <th>Nước sản xuất</th>
                  <th>Giá</th>
                  <th>Mô tả</th>
                  <th>Số lượng tồn</th>
                  <th>Sale</th>
                  <th>Trạng thái xóa</th>
                  <th>Ngày thêm</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* <TableRow data={products}/> */}
                {products?.map((item, index) => (
                  <tr key={item.MASP}>
                    <td>{index+1}</td>
                    <td>
                      <img src={item.HINHANH} />
                    </td>
                    <td>{item.MASP}</td>
                    <td>{item.TENSP}</td>
                    <td>{item.LOAISP}</td>
                    <td>{item.NUOCSX}</td>
                    <td>
                      {item.DONGIA.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td>{item.MOTA}</td>
                    <td>{item.SOLUONGTON}</td>
                    <td>{item.SALE}</td>
                    <td>{item.TRANGTHAIXOA ? "Ngừng bán" : "Đang bán"}</td>
                    <td>{item.NGAYTHEM}</td>
                    <td>
                      <i
                        class="fa-solid fa-pen-to-square"
                        style={{ marginRight: 10, color: "#0a1d37" }}
                        onClick={() => {
                          setShowEdit(true);
                          setMasp(item.MASP);
                          setTen2(item.TENSP);
                          setLoai2(item.LOAISP);
                          setNuoc2(item.NUOCSX);
                          setGia2(item.DONGIA);
                          setMota2(item.MOTA);
                          setAnh2(item.HINHANH)
                          setSoLuong2(item.SOLUONGTON);
                          setSale2(item.SALE);
                          setTrangThai2(item.TRANGTHAIXOA);
                        }}
                      ></i>
                      <i
                        class="fa-solid fa-trash-can"
                        style={{ color: "#ff0000" }}
                        onClick={() => confirm(item.MASP)}
                        // onClick={confirm(item.MASP)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* <!--- Model Box ---> */}
        <div className="model_box">
          <Modal
            isOpen={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <ModalHeader closeButton>Thêm sản phẩm</ModalHeader>
            <form onSubmit={handleAdd}>
              <div class="form-group">
                <label htmlFor="">Tên sản phẩm</label>
                <input
                  onChange={(e) => setTen(e.target.value)}
                  type="text"
                  class="form-control"
                  id="ten"
                  placeholder="Nhập tên sản phẩm"
                />
                <p className="err">{err.ten}</p>
              </div>
              <label htmlFor="">Loại sản phẩm</label>
              <select
                class="form-group"
                onChange={(e) => setLoai(e.target.value)}
              >
                {type.map((item, index) => (
                  <option key={index} value={item.LOAISP}>
                    {" "}
                    {item.LOAISP}{" "}
                  </option>
                ))}
              </select>
              <div class="form-group mt-3">
                <label htmlFor="">Nước sản xuất</label>
                <input
                  onChange={(e) => setNuoc(e.target.value)}
                  type="text"
                  class="form-control"
                  id="nuoc"
                  placeholder="Nhập nước sản xuất"
                />
                <p className="err">{err.nuoc}</p>
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Giá</label>
                <input
                  onChange={(e) => setGia(e.target.value)}
                  type="tel"
                  class="form-control"
                  id="gia"
                  placeholder="Nhập giá"
                />
                <p className="err">{err.gia}</p>
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Mô tả sản phẩm</label>
                <textarea
                  onChange={(e) => setMota(e.target.value)}
                  class="form-control"
                  id="mota"
                  placeholder="Nhập mô tả"
                />
                <p className="err">{err.mt}</p>
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Số lượng</label>
                <input
                  onChange={(e) => setSoLuong(e.target.value)}
                  type="number"
                  class="form-control"
                  id="soluong"
                  placeholder="Nhập số lượng tồn"
                />
                <p className="err">{err.sl}</p>
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Ảnh</label>
                <input
                  onChange={handleImg}
                  type="file"
                  class="form-control"
                  id="anh"
                  placeholder="Nhập link ảnh"
                />
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Tỉ lệ sale</label>
                <input
                  onChange={(e) => setSale(e.target.value)}
                  type="tel"
                  class="form-control"
                  id="anh"
                  placeholder="Nhập phần trăm sale"
                />
                <p className="err">{err.sale}</p>
              </div>
              <div class="form-group mt-3">
                <input
                  type="radio"
                  name="state"
                  value="false"
                  checked={JSON.parse(trangThai) === false ? true : false}
                  onChange={(e) => setTrangThai(e.target.value)}
                />{" "}
                Sử dụng
                <input
                  type="radio"
                  name="state"
                  value="true"
                  style={{ marginLeft: 10 }}
                  checked={JSON.parse(trangThai) === true ? true : false}
                  onChange={(e) => setTrangThai(e.target.value)}
                />{" "}
                Ngừng kinh doanh
              </div>

              <button type="submit" class="btn btn-success mt-4 center">
                Thêm sản phẩm
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

        <div className="model_box">
          <Modal
            isOpen={showEdit}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <ModalHeader closeButton>Cập nhật sản phẩm</ModalHeader>
            <form onSubmit={handleEdit}>
              <div class="form-group">
                <label htmlFor="">Tên sản phẩm</label>
                <input
                  onChange={(e) => setTen2(e.target.value)}
                  type="text"
                  class="form-control"
                  id="ten"
                  value={ten2}
                  placeholder="Nhập tên sản phẩm"
                />
                <p className="err">{err2.ten}</p>
              </div>
              <label htmlFor="">Loại sản phẩm</label>
              <select
                class="form-group"
                onChange={(e) => setLoai2(e.target.value)}
                value={loai2}
              >
                {type.map((item, index) => (
                  <option key={index} value={item.LOAISP}>
                    {" "}
                    {item.LOAISP}{" "}
                  </option>
                ))}
              </select>
              <div class="form-group mt-3">
                <label htmlFor="">Nước sản xuất</label>
                <input
                  onChange={(e) => setNuoc2(e.target.value)}
                  type="text"
                  class="form-control"
                  id="nuoc"
                  placeholder="Nhập nước sản xuất"
                  value={nuoc2}
                />
                <p className="err">{err2.nuoc}</p>
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Giá</label>
                <input
                  onChange={(e) =>
                    setGia2(e.target.value.replace(/[^0-9\.-]+/g, ""))
                  }
                  type="tel"
                  class="form-control"
                  id="gia"
                  placeholder="Nhập giá"
                  value={gia2}
                />
                <p className="err">{err2.gia}</p>
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Mô tả sản phẩm</label>
                <textarea
                  onChange={(e) => setMota2(e.target.value)}
                  class="form-control"
                  id="mota"
                  placeholder="Nhập mô tả"
                  value={mota2}
                />
                <p className="err">{err2.mt}</p>
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Số lượng</label>
                <input
                  onChange={(e) => setSoLuong2(e.target.value)}
                  type="number"
                  class="form-control"
                  id="soluong"
                  placeholder="Nhập số lượng tồn"
                  value={soLuong2}
                />
                <p className="err">{err2.sl}</p>
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Ảnh</label>
                <input
                  onChange={handleImg2}
                  type="file"
                  class="form-control"
                  id="anh2"
                  // value={anh2}
                />
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Tỉ lệ sale</label>
                <input
                  onChange={(e) => setSale2(e.target.value)}
                  type="tel"
                  class="form-control"
                  id="anh"
                  placeholder="Nhập phần trăm sale"
                  value={sale2}
                />
                <p className="err">{err2.sale}</p>
              </div>
              <div class="form-group mt-3">
                <input
                  type="radio"
                  name="state"
                  value="false"
                  checked={JSON.parse(trangThai) === false ? true : false}
                  onChange={(e) => setTrangThai2(e.target.value)}
                />{" "}
                Sử dụng
                <input
                  type="radio"
                  name="state"
                  value="true"
                  style={{ marginLeft: 10 }}
                  checked={JSON.parse(trangThai) === true ? true : false}
                  onChange={(e) => setTrangThai2(e.target.value)}
                />{" "}
                Ngừng kinh doanh
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

export default Product;

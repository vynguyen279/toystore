// import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState, useEffect } from "react";
import './style/form.css'
import { addProduct, getListProduct, deleteProduct, updateProduct } from "../server/callAPI";
import { Button, Modal, Input, ModalFooter, ModalHeader, Table } from "reactstrap";

const Product = () => {

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [ten, setTen] = useState("");
  const [loai, setLoai] = useState("");
  const [nuoc, setNuoc] = useState("");
  const [gia, setGia] = useState(0);
  const [mota, setMota] = useState("");
  const [soLuong, setSoLuong] = useState(0);
  const [anh, setAnh] = useState("");
  const [sale, setSale] = useState(0.0);
  const [trangThai, setTrangThai] = useState(false);

  const [ten2, setTen2] = useState("");
  const [masp, setMasp] = useState("");
  const [loai2, setLoai2] = useState("");
  const [nuoc2, setNuoc2] = useState("");
  const [gia2, setGia2] = useState(0);
  const [mota2, setMota2] = useState("");
  const [soLuong2, setSoLuong2] = useState(0);
  const [anh2, setAnh2] = useState("");
  const [sale2, setSale2] = useState(0.0);
  const [trangThai2, setTrangThai2] = useState(false);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let data = {
      KEY: query,
    };

    getListProduct(data)
      .then(function (response) {
        console.log(response.data.data);
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
        console.log(response.data.data);
        setProducts(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [products]);

  const handleSearch = (e) => {
    const searchItem = e.target.value;
    console.log(searchItem);
    setQuery(searchItem);
  };

  const handleAdd = () => {
    const data = {
      TENSP: ten,
      LOAISP: loai,
      NUOCSX: nuoc,
      DONGIA: parseFloat(gia),
      MOTA: mota,
      SOLUONGTON: parseInt(soLuong),
      HINHANH: anh,
      SALE: parseFloat(sale),
      TRANGTHAIXOA: JSON.parse(trangThai),
    };
    console.log(data);
    addProduct(data)
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
      MASP: masp,
      TENSP: ten2,
      LOAISP: loai2,
      NUOCSX: nuoc2,
      DONGIA: parseFloat(gia2),
      MOTA: mota2,
      SOLUONGTON: parseInt(soLuong2),
      HINHANH: anh2,
      SALE: parseFloat(sale2),
      TRANGTHAIXOA: JSON.parse(trangThai2),
    };
    console.log(data);
    updateProduct(data)
      .then((rs) => {
        if (rs.status) alert("Cập nhật thành công");
        console.log(rs);
      })
      .catch(function (error) {
        alert("Cập nhật thất bại!");
      });
  };

  const handleDelete = (masp) => {
    
  };

  const confirm = (masp) => {
    var r = window.confirm("Bạn có muốn xóa sản phẩm này?")
    if(r==true)
    {
      const data = {
        MASP: masp,
      };
      deleteProduct(data)
        .then((rs) => {
          if (rs.data.status) {
            alert("Xóa thành công");
            setProducts([]);
          }
        })
        .catch(function (error) {
          alert("Xóa thất bại!");
        });
    }
    else
      return
  }

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
          <div class="col-sm-3 offset-sm-1 ml-4 mt-5 mb-4 text-gred" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="primary" onClick={handleShow} >
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
                    <td>{index}</td>
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
                          setTen2(item.TENSP)
                          setLoai2(item.LOAISP)
                          setNuoc2(item.NUOCSX)
                          setGia2(item.DONGIA)
                          setMota2(item.MOTA)
                          setSoLuong2(item.SOLUONGTON)
                          setSale2(item.SALE)
                          setTrangThai2(item.TRANGTHAIXOA)
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
            <ModalHeader closeButton></ModalHeader>
            <form>
              <div class="form-group">
                <label htmlFor="">Tên sản phẩm</label>
                <input
                  onChange={(e) => setTen(e.target.value)}
                  type="text"
                  class="form-control"
                  id="ten"
                  placeholder="Nhập tên sản phẩm"
                />
              </div>
              <label htmlFor="">Loại sản phẩm</label>
              <select
                class="form-group"
                onChange={(e) => setLoai(e.target.value)}
              >
                <option value="hhh">ffff</option>
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
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Mô tả sản phẩm</label>
                <textarea
                  onChange={(e) => setMota(e.target.value)}
                  class="form-control"
                  id="mota"
                  placeholder="Nhập mô tả"
                />
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
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Ảnh</label>
                <input
                  onChange={(e) => setAnh(e.target.value)}
                  type="text"
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
              </div>
              <div class="form-group mt-3">
                <input
                  type="radio"
                  name="state"
                  value="false"
                  checked={true}
                  style={{ marginRight: 10 }}
                  onChange={(e) => setTrangThai(e.target.value)}
                />{" "}
                Sử dụng
                <input
                  type="radio"
                  name="state"
                  value="true"
                  onChange={(e) => setTrangThai(e.target.value)}
                />{" "}
                Ngừng kinh doanh
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
            <ModalHeader closeButton></ModalHeader>
            <form>
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
              </div>
              <label htmlFor="">Loại sản phẩm</label>
              <select
                class="form-group"
                onChange={(e) => setLoai2(e.target.value)}
                value={loai2}
              >
                <option value="hhh">ffff</option>
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
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Giá</label>
                <input
                  onChange={(e) => setGia2((e.target.value).replace(/[^0-9\.-]+/g,""))}
                  type="tel"
                  class="form-control"
                  id="gia"
                  placeholder="Nhập giá"
                  value={gia2}
                />
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
              </div>
              <div class="form-group mt-3">
                <label htmlFor="">Ảnh</label>
                <input
                  onChange={(e) => setAnh2(e.target.value)}
                  type="text"
                  class="form-control"
                  id="anh"
                  placeholder="Nhập link ảnh"
                  value={anh2}
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
              </div>
              <div class="form-group mt-3">
                <input
                  type="radio"
                  name="state"
                  value="false"
                  checked={true}
                  style={{ marginRight: 10 }}
                  onChange={(e) => setTrangThai2(e.target.value)}
                />{" "}
                Sử dụng
                <input
                  type="radio"
                  name="state"
                  value="true"
                  onChange={(e) => setTrangThai2(e.target.value)}
                />{" "}
                Ngừng kinh doanh
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

export default Product;

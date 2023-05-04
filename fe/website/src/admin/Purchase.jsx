import React from "react";
import { Container, Row, Col } from "reactstrap";
import "./style/purchase.css";
import {
  Button,
  Modal,
  Input,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import { useState, useEffect } from "react";
import {
  filterOrder,
  getInfo,
  getInfoPurchase,
  updateOrder,
  addBill
} from "../server/callAPI";

const Purchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [type, setType] = useState("Tất cả");
  const [open, setOpen] = useState(false);
  const [ten, setTen] = useState("");
  const [total, setTotal] = useState(0.0);
  const [id, setId] = useState("");
  const [ddh, setDDH] = useState("");
  const [dc, setDc] = useState("");
  const [cartItems, setItems] = useState([]);
  const [gt, setGt] = useState(false);
  const [email, setEmail] = useState("");
  const [sdt, setSdt] = useState("");
  const [ngaySinh, setNgaySinh] = useState("");
  const [key, setKey] = useState("");
  const [tt, setTt] = useState("");

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    setKey(filterValue);
  };

  const handleFilter2 = (e) => {
    const filterValue = e.target.value;
    setType(filterValue);
  };

  useEffect(() => {
    getPurchases();
  }, [key, type]);

  // useEffect(() => {
  //   GetUser();
  // }, [id]);

  const confirm = (MSDDH, TRANGTHAI) => {
    updateOrder({ MSDDH: MSDDH, TRANGTHAI: TRANGTHAI })
      .then((rs) => {
        if (rs.data.status) {
          alert("Thay đổi trạng thái đơn hàng thành công");
        }
        // else alert(rs.data.data);
        else alert(rs.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const confirmPay = (MSDDH, TRANGTHAI, MANV, TONGGIA) => {
    console.log(total)
    updateOrder({ MSDDH: MSDDH, TRANGTHAI: TRANGTHAI })
      .then((rs) => {
        if (rs.data.status) {
          addBill({ MANV: MANV, TONGGIA: TONGGIA, MSDDH: MSDDH })
          .then((rs) => {
            if (rs.data.status) {
              alert("Thay đổi trạng thái đơn hàng thành công");
            }
            // else alert(rs.data.data);
            else alert(rs.data.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        }
        // else alert(rs.data.data);
        else alert(rs.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const GetUser = (MAKH, MSDDH) => {
    getInfo({ EMAIL: MAKH })
      .then((rs) => {
        if (rs.data.status) {
          // console.log(rs.data.data[0]);
          setTen(rs.data.data[0].HOTEN);
          setDc(rs.data.data[0].DIACHI);
          setNgaySinh(rs.data.data[0].NGAYSINH);
          setSdt(rs.data.data[0].SDT);
          setEmail(rs.data.data[0].EMAIL);
          setGt(rs.data.data[0].GIOITINH);
          getInfoPurchase({ MSDDH: MSDDH })
            .then((rs) => {
              if (rs.data.status) {
                
                for (let i = 0; i < rs.data.data.length; i++) {
                  // console.log(rs.data.data[i]);
                  let obj = {
                    TENSP: rs.data.data[i].TENSP,
                    NUOCSX: rs.data.data[i].NUOCSX,
                    SOLUONG: rs.data.data[i].SL,
                    DONGIA: rs.data.data[i].DONGIA,
                  };
                  setItems((prevArray) => [...prevArray, obj]);
                  // setTotal((pre)=>pre+(DONGIA*SOLUONG))
                  // cartItems.push(obj);
                }
              }
              // else alert(rs.data.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        } else alert(rs.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getPurchases = () => {
    let data = {
      KEY: key,
      TYPE: type,
    };

    filterOrder(data)
      .then(function (response) {
        if (response.data.status) setPurchases(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div class="container ">
      <div className="crud shadow-lg p-4 mb-3 mt-5 bg-body rounded">
        <div class="row">
          <div class="col-sm-3 mt-5 mb-1">
            <div className="search">
              <input
                class="form-control mr-sm-2"
                type="search"
                onChange={handleFilter}
                placeholder="Tìm đơn hàng"
                aria-label="Search"
              />
            </div>
          </div>
          <div
            class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: "green", alignContent: "flex-start" }}
          >
            <h2>
              <b>Danh sách đơn hàng</b>
            </h2>
          </div>
          <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            <div className="filter__widget">
              <select onChange={handleFilter2}>
                <option value="Tất cả">Tất cả</option>
                <option value="Chờ xác nhận">Chờ xác nhận</option>
                <option value="Đã xác nhận">Đã xác nhận</option>
                <option value="Đã thanh toán">Đã thanh toán</option>
                <option value="Hoàn thành">Hoàn thành</option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="table-responsive ">
            <table class="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Mã đơn hàng</th>
                  <th>Mã khách hàng</th>
                  <th>Ngày đặt</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {purchases?.map((item, index) => (
                  <tr key={item.MSDDH}>
                    <td>{index + 1}</td>
                    <td>{item.MSDDH}</td>
                    <td>{item.MAKH}</td>
                    <td>{item.NGAYDAT}</td>
                    <td>{item.TRANGTHAI}</td>
                    <td>
                      <i
                        class="fa-solid fa-pen-to-square"
                        style={{ marginRight: 10, color: "#0a1d37" }}
                        onClick={() => {
                          setItems([]);
                          setTt(item.TRANGTHAI);
                          GetUser(item.MAKH, item.MSDDH);
                          setDDH(item.MSDDH); 
                          setOpen(true);
                        }}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="model_box">
        <Modal
          isOpen={open}
          // onHide={handleClose}
          backdrop="static"
          keyboard={false}
          style={{ "min-width": "80%" }}
        >
          <ModalHeader>Thông tin đơn hàng</ModalHeader>
          <Row>
            <Col>
              <form>
                <div class="form-group">
                  <label htmlFor="">Họ tên Khách hàng</label>
                  <input
                    disabled
                    value={ten}
                    type="text"
                    class="form-control"
                    id="ten"
                  />
                </div>
                <div class="form-group mt-3">
                  <label htmlFor="">SĐT</label>
                  <input
                    disabled
                    type="tel"
                    value={sdt}
                    class="form-control"
                    id="sdt"
                  />
                  <p className="err"></p>
                </div>
                <div class="form-group mt-3">
                  <label htmlFor="">Địa chỉ</label>
                  <textarea
                    disabled
                    type="text"
                    value={dc}
                    class="form-control"
                    id="diachi"
                  />
                </div>
                <div class="form-group mt-3">
                  <label htmlFor="">Email</label>
                  <input
                    disabled
                    type="email"
                    class="form-control"
                    value={email}
                    id="email"
                  />
                </div>
                <div class="form-group mt-3">
                  <label htmlFor="">Ngày sinh</label>
                  <input
                    disabled
                    // onChange={(e) => setEmail2(e.target.value)}
                    type="text"
                    class="form-control"
                    value={ngaySinh}
                    id="ngaySinh"
                  />
                  {/* <p className="err">{err2.email}</p> */}
                </div>
                <div class="form-group mt-3">
                  <input
                    disabled
                    type="radio"
                    name="gender"
                    value="false"
                    checked={JSON.parse(gt) === false ? true : false}
                    style={{ marginRight: 10 }}
                    // onChange={(e) => setGt2(e.target.value)}
                  />{" "}
                  Nữ
                  <input
                    disabled
                    type="radio"
                    style={{ marginLeft: 10 }}
                    name="gender"
                    value="true"
                    checked={JSON.parse(gt) === true ? true : false}
                    // onChange={(e) => setGt2(e.target.value)}
                  />{" "}
                  Nam
                </div>
              </form>
            </Col>
            <Col>
              <table className="table bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th style={{ paddingLeft: 30 }}>Sản phẩm</th>
                    <th>Xuất xứ</th>
                    <th>Số lượng</th>
                    <th style={{ paddingLeft: 30 }}>Giá</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* {cartItems.map((item, index) => (
                      <tr item={item} key={index} />
                    ))} */}
                  {/* {cartItems.map((item, index) => (
                  <tr key={index}>
                    {Object.values(item).map((val) => (
                      <td>{val}</td>
                    ))}
                  </tr>
                ))} */}
                  {cartItems?.map((item, index) => (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td style={{ paddingLeft: 20 }}>{item.TENSP}</td>
                      <td style={{ paddingLeft: 25 }}>{item.NUOCSX}</td>
                      <td style={{ paddingLeft: 30 }}>{item.SOLUONG}</td>
                      <td style={{ paddingLeft: 8 }}>
                        {item.DONGIA.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <label htmlFor="">Trạng thái đơn hàng</label>
                <input
                  type="text"
                  value={tt}
                  style={{ marginLeft: 15 }}
                  disabled
                />
              </div>
              {tt == "Chờ xác nhận" ? (
                <Button
                  color="success"
                  onClick={() => {
                    confirm(ddh, "Đã xác nhận");
                  }}
                >
                  Xác nhận
                </Button>
              ) : tt == "Đã xác nhận" ?(
                <Button color="primary"  onClick={() => {
                  confirmPay(ddh, "Đã thanh toán", 1000,'NV00000001');
                }}>Đã thanh toán</Button>
              ): <p></p>}
            </Col>
          </Row>

          <ModalFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </Modal>

        {/* Model Box Finsihs */}
      </div>
    </div>
  );
};

export default Purchase;

import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useState, useEffect } from "react";
import { filterOrder } from "../server/callAPI";

const Purchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [type, setType] = useState("Tất cả");
  const [key, setKey] = useState("");

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
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;

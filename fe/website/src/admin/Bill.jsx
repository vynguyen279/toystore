
import React, { useState, useEffect } from "react";
import "./style/form.css"
import { getListBill } from "../server/callAPI";
import { Button,Modal,Input, ModalFooter, ModalHeader } from 'reactstrap';

const Bill = () => {
  const [bills, setBill] = useState([])
  const [query, setQuery] = useState("")
  useEffect(()=>{
    let data = {
        KEY: query
    }

    getListBill(data)
    .then(function (response) {
      // console.log(response.data.data)
      setBill(response.data.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}, [query])

const handleSearch = (e)=>{
    const searchItem = e.target.value
    // console.log(searchItem)
    setQuery(searchItem)
}
  return (
    <div class="container ">
    <div className="crud shadow-lg p-4 mb-3 mt-5 bg-body rounded"> 
    <div class="row">
     
     <div class="col-sm-3 mt-5 mb-1">
        <div className="search">
           <input class="form-control mr-sm-2" type="search" onChange={handleSearch}placeholder="Tìm hóa đơn" aria-label="Search"/>
        </div>    
        </div>  
        <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"green", alignContent: "flex-start"}}><h2><b>Danh sách hóa đơn</b></h2></div>
        <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
       </div>
     </div>  
      <div class="row">
          <div class="table-responsive " >
           <table class="table table-striped table-hover table-bordered">
              <thead>
                  <tr>
                      <th>#</th>
                      <th>Số hóa đơn</th>
                      <th>Mã số đơn hàng</th>
                      <th>Khách hàng</th>
                      <th>Nhân viên lập hóa đơn</th>
                      <th>Tổng tiền</th>
                      <th></th>
                  </tr>
              </thead>
              <tbody>
              {bills?.map((item, index) => (
            <tr key={item.SOHD}>
              <td>{index+1}</td>
              <td>{item.SOHD}</td>
              <td>{item.MSDDH}</td>
              <td>{item.KHACHHANG}</td>
              <td>{item.NHANVIEN}</td>
              <td>{item.TONGGIA.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}</td>
              <td>
                <i
                  class="fa-solid fa-pen-to-square"
                  style={{ marginRight: 10, color: "#0a1d37" }}
                ></i>
                {/* <i
                  class="fa-solid fa-trash-can"
                  style={{ color: "#ff0000" }}
                ></i> */}
              </td>
            </tr>
          ))}
              </tbody>
          </table>
      </div>   
  </div>  

</div>    
</div>  
  )
}

export default Bill

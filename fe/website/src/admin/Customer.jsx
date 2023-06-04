// import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState, useEffect } from "react";
import "./style/form.css"
import { deleteCustomer, getListCustomer } from "../server/callAPI";
import checkRole from "../components/checkRole";
import { Button,Modal,Input, ModalFooter, ModalHeader } from 'reactstrap';
 
const Customer = () => {
    checkRole()
    // const [show, setShow] = useState(false);
    const [customers, setCustomers] = useState([])
    const [query, setQuery] = useState("")


    useEffect(()=>{
        let data = {
            KEY: query
        }
    
        getListCustomer(data)
        .then(function (response) {
          console.log(response.data.data)
          setCustomers(response.data.data);
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

    const handleDelete = (makh) => {
      const data = {
        MAKH: makh,
      };
      deleteCustomer(data)
        .then((rs) => {
          if (rs.data.status) {
            alert("Xóa thành công");
            setCustomers([]);
          }
        })
        .catch(function (error) {
          alert("Xóa thất bại!");
        });
    };
 
  return (
 
       <div class="container ">
          <div className="crud shadow-lg p-4 mb-3 mt-5 bg-body rounded"> 
          <div class="row">
           
           <div class="col-sm-3 mt-5 mb-1">
              <div className="search">
                 <input class="form-control mr-sm-2" type="search" onChange={handleSearch}placeholder="Tìm khách hàng" aria-label="Search"/>
              </div>    
              </div>  
              <div class="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred" style={{color:"green", alignContent: "flex-start"}}><h2><b>Danh sách khách hàng</b></h2></div>
              <div class="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
             </div>
           </div>  
            <div class="row">
                <div class="table-responsive " >
                 <table class="table table-striped table-hover table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mã khách hàng</th>
                            <th>Họ tên</th>
                            <th>Ngày sinh</th>
                            <th>SĐT</th>
                            <th>Địa chỉ</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {typeof(customers)==='object'?customers.map((item, index) => (
                  <tr key={item.MAKH}>
                    <td>{index+1}</td>
                    <td>{item.MAKH}</td>
                    <td>{item.HOTEN}</td>
                    <td>{item.NGAYSINH}</td>
                    <td>{item.SDT}</td>
                    <td>{item.DIACHI}</td>
                    <td>{item.EMAIL}</td>
                  </tr>
                )):<h1>Không tìm thấy kết quả!</h1>}
                    </tbody>
                </table>
            </div>   
        </div>  
 
      </div>    
      </div>  
  );
}
 
export default Customer;
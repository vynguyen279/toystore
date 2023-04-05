import React from 'react'
import '../../App.css'

const TableRowCustomer = ({data}) => {

  return (
    <>
    {
      data?.map((item, index) => (
        <tr key={item.MASP}>
            <td>{index}</td>
            <td>
                <img src={item.HINHANH}/>
            </td>
            <td>{item.MASP}</td>
            <td>{item.TENSP}</td>
            <td>{item.LOAISP}</td>
            <td>{item.NUOCSX}</td>
            <td>{item.DONGIA.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  })}</td>
            <td>{item.MOTA}</td>
            <td>{item.SOLUONGTON}</td>
            <td>{item.SALE}</td>
            <td>{item.TRANGTHAIXOA}</td>
            <td>
            <i class="ri-pencil-fill" style={{marginRight: 10, color: '#0a1d37'}}></i>
            <i class="ri-delete-bin-5-fill" style={{color: '#ff0000'}}></i>
            </td>
        </tr>
      ))
    }
  </>
  )
}

export default TableRowCustomer

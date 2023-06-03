import React, { useState, useEffect } from "react";
import { ListGroupItem } from "reactstrap"
import { useDispatch } from "react-redux"
import { deleteCart, addCart, getInfo, getListProduct } from "../../../server/callAPI"
import { cartActions } from "../../../store/shopping-cart/cartSlice"
import "../../../styles/cart-item.css"

const CartItem = ({item}) => {
  const {
    MASP,
    SALE,
    TENSP,
    DONGIA,
    HINHANH,
    quantity,

  } = item;
//   useEffect(()=>{
//     const data = {
//       KEY: item.MASP
//     }
//     getListProduct(data)
//     .then(function (response) {
//       // console.log(response.data.data)
//       console.log(response.data.data.SOLUONGTON);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }, [])

  const dispatch = useDispatch()
  const incrementItem = () => {
    dispatch(cartActions.addItem(item))
    const data = {
      KEY: item.MASP
    }
    getListProduct(data)
    .then(function (response) {
      console.log(response.data.data[0].SOLUONGTON)
      if(response.data.data[0].SOLUONGTON>parseInt(quantity)){
         dispatch(cartActions.addItem(item))
         getInfo({EMAIL: window.localStorage.getItem('username')})
          .then(function (response) {
            if(response.data.status)
            addCart({MASP: MASP, MAKH: response.data.data[0].MAKH, SOLUONG: 1})
            // console.log(response.data.data[0].MAKH);
            else
            return
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      else {
          alert("Số lượng sản phẩm này còn trong kho là "+ response.data.data[0].SOLUONGTON)
          return;
      }
    })
    .catch(function (error) {
      console.log(error);
    });

    // dispatch(cartActions.addItem(item))
    // getInfo({EMAIL: window.localStorage.getItem('username')})
    // .then(function (response) {
    //   if(response.data.status)
    //   addCart({MASP: MASP, MAKH: response.data.data[0].MAKH, SOLUONG: 1})
    //   // console.log(response.data.data[0].MAKH);
    //   else
    //   return
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }


  const decrementItem = () => {
    dispatch(cartActions.removeItem(item.MASP))
    getInfo({EMAIL: window.localStorage.getItem('username')})
    .then(function (response) {
      if(response.data.status)
      deleteCart({MASP: MASP, MAKH: response.data.data[0].MAKH, SOLUONG: 1})
      // console.log(response.data.data[0].MAKH);
      else
      return
    })
    .catch(function (error) {
      console.log(error);
    });
    }

  const deletetItem = () => {
    dispatch(cartActions.deleteItem(item.MASP))
    getInfo({EMAIL: window.localStorage.getItem('username')})
    .then(function (response) {
      if(response.data.status)
      deleteCart({MASP: MASP, MAKH: response.data.data[0].MAKH, SOLUONG: quantity})
      // console.log(response.data.data[0].MAKH);
      else
      return
    })
    .catch(function (error) {
      console.log(error);
    });
    }
   
  return (
    <ListGroupItem className="border-0 cart__item">
      <div className="cart__item-info d-flex gap-2">
        <img src={HINHANH} alt="product image" />
        <div className="cart__product-info w-100 d-flex align-items-center justify-content-between gap-4">
          <div>
            <h6 className="cart__product-title fs-5">{TENSP}</h6>
            <p className="d-flex align-items-center gap-5 cart__product-price">
              x{quantity}<span>{parseFloat(DONGIA).toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    })}</span>
            </p>
            <div className="d-flex align-items-center justify-content-between increase__decrease-btn">
              <span className="decrease__btn" onClick={decrementItem}>
                <i className="fa fa-minus-square"></i>
              </span>
              <span className="quantity">{quantity}</span>
              <span className="increase__btn" onClick={incrementItem}>
                <i className="fa fa-plus-square"></i>
              </span>
            </div>
          </div>
          <span className="delete__btn" onClick={deletetItem} role='button'>
            <i className="fa fa-trash"></i>
          </span>
        </div>
      </div>
    </ListGroupItem>
  );
};

export default CartItem;

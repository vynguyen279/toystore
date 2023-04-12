import React from "react"
import { ListGroupItem } from "reactstrap"
import { useDispatch } from "react-redux"
import { cartActions } from "../../../store/shopping-cart/cartSlice"
import "../../../styles/cart-item.css"

const CartItem = ({item}) => {
  const {
    MASP,
    TENSP,
    DONGIA,
    HINHANH,
    quantity,
    totalPrice
  } = item;



  const dispatch = useDispatch()
  const incrementItem = () => {
    dispatch(cartActions.addItem({
      MASP,
      TENSP,
      DONGIA,
      HINHANH,
      quantity,
      totalPrice
    }))
  }


  const decrementItem = () => {
    dispatch(cartActions.removeItem(MASP))
    }
  const deletetItem = () => {
    dispatch(cartActions.deleteItem(MASP))
    }
   
  return (
    <ListGroupItem className="border-0 cart__item">
      <div className="cart__item-info d-flex gap-2">
        <img src={HINHANH} alt="product image" />
        <div className="cart__product-info w-100 d-flex align-items-center justify-content-between gap-4">
          <div>
            <h6 className="cart__product-title fs-5">{TENSP}</h6>
            <p className="d-flex align-items-center gap-5 cart__product-price">
              x{quantity}<span>{DONGIA}đ</span>
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

import React from "react";
import { ListGroup } from "reactstrap";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartUiActions } from "../../../store/shopping-cart/cartUiSlice";
import "../../../styles/shopping-cart.css";

const Carts = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(state => state.cart.cartItems)
  const total = useSelector(state => state.cart.totalAmount)
  console.log(total.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  }))

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  return (
    <div className="cart__container">
      <ListGroup className="cart">
        <div className="cart__close">
          <span onClick={toggleCart}>
            <i className="fa fa-window-close"></i>
          </span>
        </div>
        <div className="cart__item-list">
         {
            cartProducts.length === 0? <h6 className="text-center mt-5">Không có sản phẩm</h6>: cartProducts.map((item, index)=>(
               <CartItem item={item} key={index} />
            ))
         }
        </div>
        <div className="cart__bottom d-flex flex-column align-items-center justify-content-between">
          <h6 className=" w-100 d-flex justify-content-between">
            Tổng tiền: <span>{total}đ</span>
          </h6>
          <button>
            <Link to="checkout">Thanh toán</Link>
          </button>
        </div>
      </ListGroup>
    </div>
  );
};

export default Carts;

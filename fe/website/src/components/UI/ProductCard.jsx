import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import "../../styles/product-card.css";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { getInfo, addCart } from "../../server/callAPI";
import { Login } from "../../pages/Login";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/shopping-cart/cartSlice";

const ProductCard = ({ item }) => {
  const history = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { MASP, TENSP, NUOCSX, DONGIA, HINHANH } = item;
  item.DONGIA = item.DONGIA.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });

  const dispatch = useDispatch();

  const addToCart = () => {

    if (window.localStorage.getItem("isAuth")) {
      dispatch(
        cartActions.addItem({
          MASP,
          TENSP,
          DONGIA,
          HINHANH,
          NUOCSX,
          
        })
      );
      getInfo({ EMAIL: window.localStorage.getItem("username") })
        .then(function (response) {
          if (response.data.status)
            addCart({
              MASP: MASP,
              MAKH: response.data.data[0].MAKH,
              SOLUONG: 1,
            })
              .then(function (response) {
                if (response.data.status) console.log(response.data.data);
                else return;
              })
              .catch(function (error) {
                console.log(error);
              });
          // console.log(response.data.data[0].MAKH);
          else return;
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      history("/Login");
    }
  };

  return (
    <Col lg="3" md="2" className="mb-3">
      <div className="product__item">
        <Link to={`/shop/${item.MASP}`}>
          <div className="product__img">
            <img
              style={{ height: 300 }}
              whileHover={{ scale: 0.9 }}
              src={HINHANH}
              alt="product img"
            />
          </div>
        </Link>
        <div className="p2 product__info p-3">
          <h3 className="product__name">{TENSP}</h3>
          <span>{NUOCSX}</span>
        </div>
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-3">
          <span className="price fs-6">{DONGIA}</span>
          <motion.span whileHover={{ scale: 1.2 }} onClick={addToCart}>
            <i class="fa-solid fa-plus"></i>
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;

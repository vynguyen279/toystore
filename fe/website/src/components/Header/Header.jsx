import React, { useRef, useEffect, useState } from "react";
import "./Header.css";
import "../../App.css";
import DropDownUser from '../UI/DropDownUser'
import { NavLink } from "react-router-dom";
import { Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/images/eco-logo.png";
import { cartUiActions } from '../../store/shopping-cart/cartUiSlice'


const nav__links = [
  {
    path: "home",
    display: "Trang chủ",
  },
  {
    path: "shop",
    display: "Sản phẩm",
  },
  {
    path: "cart",
    display: "Giỏ hàng",
  },
  {
    path: "login",
    display: "Đăng nhập",
  },
  {
    path: "signup",
    display: "Tạo tài khoản",
  },
];

const nav__links2 = [
  {
    path: "home",
    display: "Trang chủ",
  },
  {
    path: "shop",
    display: "Sản phẩm",
  },
  {
    path: "cart",
    display: "Giỏ hàng",
  },
  {
    path: "signup",
    display: "Tạo tài khoản",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  const stickyHederFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  const toggleCart = () =>{
     dispatch(cartUiActions.toggle())
  }

  useEffect(() => {
    stickyHederFunc();
    return () => window.removeEventListener("scroll", stickyHederFunc);
  });

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="" />
              <div>
                <h1>ToyStore</h1>
              </div>
            </div>
            <div className="navigation">
              <ul className="menu">
                {localStorage.getItem('isAuth')? (nav__links2.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))):(nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                )))}
              </ul>
            </div>
            <div className="nav__icons">
              <span className="cart__icon" role="button" onClick={toggleCart}>
              <i class="fa-solid fa-cart-shopping">
                  <span className="badge">{totalQuantity}</span>
                </i>
              </span>
              <span>
                <motion.i onClick={() => setOpen((pre)=> !pre)} whileTap={{ scale: 1.2 }} class="fa-solid fa-circle-user" style={{color: '#0a1d37'}}></motion.i>
                {open && <DropDownUser />}
              </span>
            </div>
            
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;

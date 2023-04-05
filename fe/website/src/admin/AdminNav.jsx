import React, { useRef, useEffect } from "react";
import "../components/Header/Header.css"
import { NavLink } from "react-router-dom";
import { Container, Row } from "reactstrap";
import { motion } from "framer-motion";
import logo from "../assets/images/eco-logo.png";
import user_icon from "../assets/images/user-icon.png";


const nav__links = [
  {
    path: "admin/officer",
    display: "Nhân viên",
  },
  {
    path: "admin/bill",
    display: "Hóa đơn",
  },
  {
    path: "admin/customer",
    display: "Khách hàng",
  },
  {
    path: "admin/product",
    display: "Sản phẩm",
  },
  {
    path: "admin/purchase",
    display: "Đơn hàng",
  },
];

const AdminNav = () => {
  const headerRef = useRef(null);

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
                {nav__links.map((item, index) => (
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
                ))}
              </ul>
            </div>
            <div className="nav__icons">
              <span>
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={user_icon}
                  alt="user"
                />
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default AdminNav;

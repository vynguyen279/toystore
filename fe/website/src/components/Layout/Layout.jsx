import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routes/Routers";
import Carts from "../UI/cart/Carts";
import AdminNav from "../../admin/AdminNav";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const Layout = () => {
  const showCart = useSelector((state) => state.cartUi.cartIsVisible);

  const location = useLocation();
  return (
    <>
      {location.pathname.startsWith("/admin") ? (
        <>
          <AdminNav />
          <div>
            <Routers />
          </div>
        </>
      ) : (
        <>
          <Header />
          {showCart && <Carts />}
          <div>
            <Routers />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;

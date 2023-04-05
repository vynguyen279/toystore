import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import ProductDetail from "../pages/ProductDetail";
import Shop from "../pages/Shop";
import Signup from "../pages/Signup";
import Account from "../admin/Account";
import Bill from "../admin/Bill";
import AdminNav from "../admin/AdminNav";
import Customer from "../admin/Customer";
import Officer from "../admin/Officer";
import Product from "../admin/Product";
import Purchase from "../admin/Purchase";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='home' />} />
      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="shop/:id" element={<ProductDetail />} />
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="admin/product" element={<Product />} />
      <Route path="admin/account" element={<Account />} />
      <Route path="admin/bill" element={<Bill />} />
      <Route path="admin/customer" element={<Customer />} />
      <Route path="admin/purchase" element={<Purchase />} />
      <Route path="admin/officer" element={<Officer />} />
    </Routes>
  );
};

export default Routers;

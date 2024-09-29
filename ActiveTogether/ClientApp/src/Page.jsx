import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Home from './Pages/Home';
import Products from './Pages/Products';
import Blog from './Pages/Blog';
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Introduction from './Pages/Introduction';
import FourOFour from './Pages/FourOFour';

import ProductDetail from './Pages/ProductDetail';
import UserDetail from './Pages/User/UserDetail';
import ChangePassword from './Pages/User/ChangePassword';

import Header from "./Shared/Header";
import BackToTop from "./Shared/BackToTop";
import Footer from "./Shared/Footer";
import PageTitle from "./Shared/PageTitle";

import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"

import phd from "/src/img/placeholder.png"
import phd2 from "/src/img/placeholder2.png"
import phd3 from "/src/img/placeholder3.png"

function RenderMain() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Trang chủ */}
        <Route exact path="/" element={<><Home /> <PageTitle title="Active Together - Cùng nhau tạo nên xã hội năng động hơn"/></>} />
        <Route path="/san-pham" element={<><Products /> <PageTitle title="Danh sách sản phẩm" /></>} />
        <Route path="/gio-hang" element={<><Cart /> <PageTitle title="Giỏ hàng của bạn" /></>} />
        <Route path="/gioi-thieu" element={<><Introduction /> <PageTitle title="Giới thiệu Active Together" /></>} />
        <Route path="/tin-tuc" element={<><Blog /> <PageTitle title="Tin tức, blog" /></>} />
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="*" element={<><FourOFour /> <PageTitle title="404 | Trang không tìm thấy"/></>} />

        {/* Trang con của Sản phẩm */}
        <Route path="/san-pham/:id" element={
          <ProductDetail title="Giày Adidas" images={[phd, phd2, phd3]} currentPrice={100000}
            oldPrice={120000} size={['S', 'M', 'L', 'XL']} color={["Tím", "Đỏ", "Xanh lá"]} />
        } />

        {/* Trang con của Người dùng */}
        <Route path="/nguoi-dung" element={<><UserDetail /> <PageTitle title="Thông tin người dùng" /></>} />
        <Route path="/nguoi-dung/doi-mat-khau" element={<><ChangePassword /> <PageTitle title="Đổi mật khẩu" /></>} />
      </Routes>
      <BackToTop />
      <Footer />
    </Router>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
  { RenderMain() }
  </StrictMode>,
)
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

/* Admin */
import Product from "./Admin/Pages/Product.jsx"
import ProductCategory from "./Admin/Pages/ProductCategory.jsx"
import Review from "./Admin/Pages/Review.jsx"
import Input from './Admin/Pages/Input.jsx'
import Order from './Admin/Pages/Order.jsx'
import Promotion from './Admin/Pages/Promotion.jsx'
import User from './Admin/Pages/User.jsx'
import BlogArticle from "./Admin/Pages/BlogArticle.jsx"
import Permission from './Admin/Pages/Permission.jsx'
import Statistic from './Admin/Pages/Statistic.jsx'
import Nav from './Admin/Shared/Nav.jsx'

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
  if (!location.pathname.includes("/admin"))
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
  else return (
    <Router>
      <div className="admin-main">
        <Nav />
        <Routes>
          <Route path="/admin/san-pham" element={<Product />} />
          <Route path="/admin/loai-san-pham" element={<ProductCategory />} />
          <Route path="/admin/review" element={<Review />} />
          <Route path="/admin/nhap-kho" element={<Input />} />
          <Route path="/admin/don-hang" element={<Order />} />
          <Route path="/admin/giam-gia" element={<Promotion />} />
          <Route path="/admin/tai-khoan-khach-hang" element={<User />} />
          <Route path="/admin/bai-blog" element={<BlogArticle />} />
          <Route path="/admin/phan-quyen" element={<Permission />} />
          <Route path="/admin/thong-ke" element={<Statistic />} />
        </Routes>
      </div>
    </Router>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
  { RenderMain() }
  </StrictMode>,
)
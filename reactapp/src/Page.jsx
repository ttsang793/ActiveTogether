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
import AProduct from "./Admin/Pages/Product.jsx"
import AProductDetail from './Admin/Pages/ProductDetail.jsx';
import ACategory from "./Admin/Pages/Category.jsx"
import ABrand from './Admin/Pages/Brand.jsx'
import ASport from './Admin/Pages/Sport.jsx'
import AReview from "./Admin/Pages/Review.jsx"
import AInput from './Admin/Pages/Input.jsx'
import AOrder from './Admin/Pages/Order.jsx'
import APromotion from './Admin/Pages/Promotion.jsx'
import AUser from './Admin/Pages/User.jsx'
import ABlogArticle from "./Admin/Pages/BlogArticle.jsx"
import APermission from './Admin/Pages/Permission.jsx'
import AStatistic from './Admin/Pages/Statistic.jsx'
import ANav from './Admin/Shared/Nav.jsx'

import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"

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
          <Route path="/san-pham/*" element={<ProductDetail />} />

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
        <ANav />
        <Routes>
          <Route path="/admin/san-pham" element={<AProduct />} />
          <Route path="/admin/thong-tin-san-pham" element={<AProductDetail />} />
          <Route path="/admin/loai-san-pham" element={<ACategory />} />
          <Route path="/admin/thuong-hieu" element={<ABrand />} />
          <Route path="/admin/the-thao" element={<ASport />} />
          <Route path="/admin/review" element={<AReview />} />
          <Route path="/admin/nhap-kho" element={<AInput />} />
          <Route path="/admin/don-hang" element={<AOrder />} />
          <Route path="/admin/giam-gia" element={<APromotion />} />
          <Route path="/admin/tai-khoan-khach-hang" element={<AUser />} />
          <Route path="/admin/bai-blog" element={<ABlogArticle />} />
          <Route path="/admin/phan-quyen" element={<APermission />} />
          <Route path="/admin/thong-ke" element={<AStatistic />} />
        </Routes>
        <BackToTop />
      </div>
    </Router>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
  { RenderMain() }
  </StrictMode>,
)
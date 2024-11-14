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
import BlogDetail from './Pages/BlogDetail';
import UserDetail from './Pages/User/UserDetail';
import ChangePassword from './Pages/User/ChangePassword';
import OrdersHistory from './Pages/User/OrdersHistory';
import UserAddress from './Pages/User/UserAddress';

import Header from "./Shared/Header";
import BackToTop from "./Shared/BackToTop";
import Footer from "./Shared/Footer";
import PageTitle from "./Shared/PageTitle";

/* Admin */
import ALogin from "./Admin/Pages/Login"
import AProduct from "./Admin/Pages/Product"
import AProductDetail from './Admin/Pages/ProductDetail';
import ACategory from "./Admin/Pages/Category"
import ABrand from './Admin/Pages/Brand'
import ASport from './Admin/Pages/Sport'
import AReview from "./Admin/Pages/Review"
import AImport from './Admin/Pages/Import'
import AImportDetail from './Admin/Pages/ImportDetail';
import AOrder from './Admin/Pages/Order'
import ARefund from './Admin/Pages/Refund';
import APromotion from './Admin/Pages/Promotion'
import APromotionDetail from './Admin/Pages/PromotionDetail';
import ABlogArticle from "./Admin/Pages/BlogArticle"
import ABlogArticleDetail from "./Admin/Pages/BlogArticleDetail"
import ABlogArticlePreview from "./Admin/Pages/BlogArticlePreview"
import APermission from './Admin/Pages/Permission'
import AStatistic from './Admin/Pages/Statistic'
import ANav from './Admin/Shared/Nav'

import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import {
  BrowserRouter as Router,
  Routes, Route, Navigate
} from "react-router-dom"

function RenderMain() {
  const username = localStorage.getItem("userLogin");

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
          <Route path="/dang-nhap" element={
            username === null ? (<><Login /> <PageTitle title="Đăng nhập" /></>) :
            (<Navigate to="/nguoi-dung" replace />)
          } />
          <Route path="*" element={<><FourOFour /> <PageTitle title="404 | Trang không tìm thấy"/></>} />

          {/* Trang con của Sản phẩm */}
          <Route path="/san-pham/*" element={<ProductDetail />} />

          {/* Trang con của Tin tức, blog */}
          <Route path="/tin-tuc/*" element={<BlogDetail />} />

          {/* Trang con của Người dùng */}
          <Route path="/nguoi-dung" element={
            username !== null ? (<><UserDetail /> <PageTitle title="Thông tin người dùng" /></>) :
            (<Navigate to="/dang-nhap" replace />)
          } />
          <Route path="/nguoi-dung/doi-mat-khau" element={
            username !== null ? (<><ChangePassword /> <PageTitle title="Đổi mật khẩu" /></>) :
            (<Navigate to="/dang-nhap" replace />)
          } />
          <Route path="/nguoi-dung/dia-chi" element={
            username !== null ? (<><UserAddress /> <PageTitle title="Địa chỉ người dùng" /></>) :
            (<Navigate to="/dang-nhap" replace />)
          } />
          <Route path="/nguoi-dung/lich-su-don-hang" element={
            username !== null ? (<><OrdersHistory /> <PageTitle title="Lịch sử đơn hàng" /></>) :
            (<Navigate to="/dang-nhap" replace />)
          } />
        </Routes>
        <BackToTop />
        <Footer />
      </Router>
    )
  else if (location.pathname === "/admin") return <Router><Routes><Route path="/admin" element={<ALogin />} /></Routes></Router>
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
          <Route path="/admin/nhap-kho" element={<AImport />} />
          <Route path="/admin/thong-tin-nhap-kho" element={<AImportDetail />} />
          <Route path="/admin/don-hang" element={<AOrder />} />
          <Route path="/admin/don-hoan-tra" element={<ARefund />} />
          <Route path="/admin/giam-gia" element={<APromotion />} />
          <Route path="/admin/chuong-trinh-giam-gia" element={<APromotionDetail />} />
          <Route path="/admin/bai-blog" element={<ABlogArticle />} />
          <Route path="/admin/thong-tin-bai-blog" element={<ABlogArticleDetail />} />
          <Route path="/admin/xem-bai-blog" element={<ABlogArticlePreview />} />
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
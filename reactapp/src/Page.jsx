import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import Home from './Pages/Home';
import Products from './Pages/product/Products';
import Blog from './Pages/blog/Blog';
import Cart from "./Pages/product/Cart";
import Order from './Pages/product/Order'
import Login from "./Pages/user/Login";
import Introduction from './Pages/blog/Introduction';
import FourOFour from './Pages/FourOFour';

import ProductDetail from './Pages/product/ProductDetail';
import BlogDetail from './Pages/blog/BlogDetail';
import UserDetail from './Pages/user/UserDetail';
import ChangePassword from './Pages/user/ChangePassword';
import OrdersHistory from './Pages/user/OrdersHistory';
import UserAddress from './Pages/user/UserAddress';

import Header from "./Shared/Header";
import BackToTop from "./Shared/BackToTop";
import Footer from "./Shared/Footer";
import PageTitle from "./Shared/PageTitle";

// Admin
import ALogin from "./Admin/Pages/Login"
import AHome from './Admin/Pages/Home'

import ANav from './Admin/Shared/Nav'
import AWider from './Admin/Shared/Wider'
//import AProduct from "./Admin/Pages/Product"
//import AProductDetail from './Admin/Pages/ProductDetail';
import ACategory from "./Admin/Pages/Category"
import ABrand from './Admin/Pages/Brand'
import ASport from './Admin/Pages/Sport'
import AColor from "./Admin/Pages/Color"
/*import AImport from './Admin/Pages/Import'
import AImportDetail from './Admin/Pages/ImportDetail';
import AOrder from './Admin/Pages/Order'
import ARefund from './Admin/Pages/Refund';
import APromotion from './Admin/Pages/Promotion'
import APromotionDetail from './Admin/Pages/PromotionDetail';
import ABlogArticle from "./Admin/Pages/BlogArticle"
import ABlogArticleDetail from "./Admin/Pages/BlogArticleDetail"
import ABlogArticlePreview from "./Admin/Pages/BlogArticlePreview"
import APermission from './Admin/Pages/Permission'*/

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
  
  if (location.pathname === "/")
    return (
      <Router>
        <Header />
        
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>

        <BackToTop />
        <Footer />
      </Router>
    )
  else if (!location.pathname.includes("/admin"))
    return (
      <Router>
        <Header />
        
        <div className="user-main-container">
          <Routes>
            <Route path="/gioi-thieu" element={<><Introduction /> <PageTitle title="Giới thiệu Active Together" /></>} />
            <Route path="/san-pham" element={<><Products /> <PageTitle title="Danh sách sản phẩm" /></>} />
            <Route path="/gio-hang" element={<><Cart /> <PageTitle title="Giỏ hàng của bạn" /></>} />
            <Route path="/thanh-toan" element={<><Order /> <PageTitle title="Thanh toán đơn hàng" /></>} />
            <Route path="/tin-tuc" element={<><Blog /> <PageTitle title="Tin tức, blog" /></>} />
            <Route path="/dang-nhap" element={
              username === null ? (<><Login /> <PageTitle title="Đăng nhập" /></>) :
              (<Navigate to="/nguoi-dung" replace />)
            } />
            <Route path="*" element={<><FourOFour /> <PageTitle title="404 | Trang không tìm thấy"/></>} />

            {
              // Trang con của Sản phẩm
            }
            <Route path="/san-pham/*" element={<ProductDetail />} />

            {
              //Trang con của Tin tức, blog
            }
            <Route path="/tin-tuc/*" element={<BlogDetail />} />

            {
              //Trang con của Người dùng
            }
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
        </div>

        <BackToTop />
        <Footer />
      </Router>
    )
    else if (location.pathname === "/admin") return <Router><Routes><Route path="/admin" element={<ALogin />} /></Routes></Router>

    else return (
      <Router>
        <ANav />
        <AWider />
        <div className="admin-main-container">
          <Routes>          
            <Route path="/admin/home" element={<><AHome /> <PageTitle title="Trang chủ của quản trị viên" /></>} />

            
            <Route path="/admin/loai-san-pham" element={<ACategory />} />
            <Route path="/admin/thuong-hieu" element={<ABrand />} />
            <Route path="/admin/the-thao" element={<ASport />} />
            <Route path="/admin/mau-sac" element={<AColor />} />
            {
            //<Route path="/admin/san-pham" element={<AProduct />} />
            //<Route path="/admin/thong-tin-san-pham" element={<AProductDetail />} />

            /*
            
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
            */}
          </Routes>
        </div>
        <BackToTop />
      </Router>
    )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
  { RenderMain() }
  </StrictMode>,
)
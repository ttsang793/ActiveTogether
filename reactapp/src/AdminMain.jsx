import FourOThree from './Admin/Shared/FourOThree';
import FourOFour from './Pages/FourOFour';
import BackToTop from "./Shared/BackToTop";
import PageTitle from "./Shared/PageTitle";

import ALogin from "./Admin/Pages/Login"

import ANav from './Admin/Shared/Nav'
import AWider from './Admin/Shared/Wider'
import AHeader from './Admin/Shared/Header';
import ASetting from './Admin/Pages/Setting';

import AProduct from "./Admin/Pages/Product"
import AProductColor from './Admin/Pages/ProductColor';
import AProductDetail from './Admin/Pages/ProductDetail';
import ACategory from "./Admin/Pages/Category"
import ABrand from './Admin/Pages/Brand'
import ASport from './Admin/Pages/Sport'
import AColor from "./Admin/Pages/Color"
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
import ARoleDetail from './Admin/Pages/RoleDetail'
import AStatistic from './Admin/Pages/Statistic';

import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

export default function AdminMain() {
  const token = Cookies.get("session_token");

  let [loading, setLoading] = useState(true);
  let [name, setName] = useState(null);
  let [username, setUsername] = useState(null);
  let [avatar, setAvatar] = useState(null);
  let [role, setRole] = useState(0);

  /*useEffect(() => {
    fetch('/user/cookie', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` }, credentials: 'include'})
    .then(response => response.json())
    .then(data => { setLoading(false); setName(name = data.name); setUsername(username = data.username); setAvatar(avatar = data.avatar); setRole(role = data.role || 0) })
    .catch(err => { setLoading(false); console.log(err) });
  }, []);*/
  
  if (location.pathname === "/admin" || location.pathname === "/admin/")
    return (
      <Router>
        <Routes>
          <Route path="/admin" element={<><ALogin /> <PageTitle title="Trang đăng nhập quản trị viên" /></>} />
        </Routes>
      </Router>
    )
  

  else if (role === 0) return <FourOThree />

  else return loading ? <PleaseWait /> : (
    <Router>
      <ANav />
      <AHeader username={username} name={name} avatar={avatar} />
      <AWider />
      <div className="admin-main-container">
        <Routes>
          <Route path="/admin/home" element={<><AStatistic /> <PageTitle title="Trang chủ của quản trị viên" /></>} />
          <Route path="/admin/thong-ke" element={<><AStatistic /> <PageTitle title="Trang chủ của quản trị viên" /></>} />
          <Route path="/admin/cai-dat-tai-khoan" element={<><ASetting /> <PageTitle title="Cài đặt tài khoản" /></>} />
          <Route path="/admin/san-pham" element={<><AProduct /> <PageTitle title="Quản lý sản phẩm" /></>} />
          <Route path="/admin/thong-tin-san-pham/*" element={<><AProductColor /> <PageTitle title="Quản lý màu sắc sản phẩm" /></>} />
          <Route path="/admin/thong-tin-mau-sac-san-pham/*" element={<><AProductDetail /> <PageTitle title="Quản lý chi tiết màu sắc sản phẩm" /></>} />
          <Route path="/admin/loai-san-pham" element={<><ACategory /> <PageTitle title="Quản lý loại sản phẩm" /></>} />
          <Route path="/admin/thuong-hieu" element={<><ABrand /> <PageTitle title="Quản lý thương hiệu" /></>} />
          <Route path="/admin/the-thao" element={<><ASport /> <PageTitle title="Quản lý môn thể thao" /></>} />
          <Route path="/admin/mau-sac" element={<><AColor /> <PageTitle title="Quản lý màu sắc" /></>} />
          <Route path="/admin/nhap-kho" element={<><AImport /> <PageTitle title="Quản lý nhập hàng" /></>} />
          <Route path="/admin/thong-tin-nhap-kho" element={<><AImportDetail /> <PageTitle title="Thông tin nhập hàng" /></>} />
          <Route path="/admin/don-hang" element={<><AOrder /> <PageTitle title="Quản lý đơn hàng đã đặt" /></>} />
          <Route path="/admin/don-hoan-tra" element={<><ARefund /> <PageTitle title="Quản lý trả hàng" /></>} />
          <Route path="/admin/giam-gia" element={<><APromotion /> <PageTitle title="Quản lý giảm giá" /></>} />
          <Route path="/admin/chuong-trinh-giam-gia/*" element={<><APromotionDetail /> <PageTitle title="Chi tiết chương trình giám giá" /></>} />
          <Route path="/admin/bai-blog" element={<><ABlogArticle /> <PageTitle title="Quản lý bài blog" /></>} />
          <Route path="/admin/thong-tin-bai-blog" element={<><ABlogArticleDetail /> <PageTitle title="Quản lý thông tin trang blog" /></>} />
          <Route path="/admin/xem-bai-blog" element={<ABlogArticlePreview />} />
          <Route path="/admin/phan-quyen" element={<><APermission /> <PageTitle title="Phân quyền" /></>} />
          <Route path="/admin/chi-tiet-vai-tro" element={<><ARoleDetail /> <PageTitle title="Chi tiết vai trò" /></>} />

          <Route path="/admin/*" element={<><FourOFour /> <PageTitle title="404 | Trang không tìm thấy" /></>} />
        </Routes>
      </div>
      <BackToTop />
    </Router>
  )
}
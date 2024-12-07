import FourOThree from '/src/Shared/FourOThree';
import FourOFour from '/src/Shared/FourOFour';

import Home from './Pages/Home';
import Products from './Pages/product/Products';
import Blog from './Pages/blog/Blog';
import Cart from "./Pages/product/Cart";
import Order from './Pages/product/Order'
import OrderFinished from './Pages/product/OrderFinished';
import Login from "./Pages/user/Login";
import RedirectRegister from "./Pages/user/RedirectRegister";
import Introduction from './Pages/blog/Introduction';
import ALogin from "./Admin/Pages/Login"

import ProductDetail from './Pages/product/ProductDetail';
import BlogDetail from './Pages/blog/BlogDetail';
import PolicyDetail from './Pages/blog/PolicyDetail';
import UserDetail from './Pages/user/UserDetail';
import ChangePassword from './Pages/user/ChangePassword';
import OrdersHistory from './Pages/user/OrdersHistory';
import UserAddress from './Pages/user/UserAddress';

import Header from "./Shared/Header";
import BackToTop from "./Shared/BackToTop";
import Footer from "./Shared/Footer";
import PageTitle from "./Shared/PageTitle";
import PleaseWait from "./Shared/PleaseWait";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

export default function UserMain() {
  const token = Cookies.get("user_token");

  let [loading, setLoading] = useState(true);
  let [name, setName] = useState(null);
  let [username, setUsername] = useState(null);
  let [avatar, setAvatar] = useState(null);

  useEffect(() => {
    fetch('/user/cookie', { method: 'GET', headers: { 'Authorization': `Bearer ${token}` }, credentials: 'include'})
    .then(response => response.json())
    .then(data => { setLoading(false); setName(name = data.name); setUsername(username = data.username); setAvatar(avatar = data.avatar) })
    .catch(() => setLoading(false));
  }, []);

  if (location.pathname === "/") return loading ? <PleaseWait /> : (
    <Router>
      <Header name={name} avatar={avatar} />
      
      <Routes>
        <Route exact path="/" element={<Home username={username} />} />
      </Routes>

      <BackToTop />
      <Footer />
    </Router>
  )

  else if (location.pathname === "/admin" || location.pathname === "/admin/")
    return (
      <Router>
        <Routes>
          <Route path="/admin" element={ <><ALogin /> <PageTitle title="Trang đăng nhập quản trị viên" /></> } />
        </Routes>
      </Router>
    )

  else if (location.pathname.includes("/admin")) return <FourOThree />
    
  else return loading ? <PleaseWait /> : (
      <Router>
        <Header name={name} avatar={avatar} />
        
        <div className="user-main-container">
          <Routes>
            <Route path="/gioi-thieu" element={<><Introduction /> <PageTitle title="Giới thiệu Active Together" /></>} />
            <Route path="/san-pham" element={<><Products /> <PageTitle title="Danh sách sản phẩm" /></>} />
            {/*
            <Route path="/gio-hang" element={<><Cart username={username} /> <PageTitle title="Giỏ hàng của bạn" /></>} />
            <Route path="/thanh-toan" element={<><Order username={username} /> <PageTitle title="Thanh toán đơn hàng" /></>} />
            <Route path="/thanh-toan/hoan-tat" element={<><OrderFinished /> <PageTitle title="Thanh toán thành công" /></>} />
            */}
            <Route path="/tin-tuc" element={<><Blog /> <PageTitle title="Tin tức, blog" /></>} />
            <Route path="/dang-nhap" element={
              username === null ? (<><Login /> <PageTitle title="Đăng nhập tài khoản" /></>) :
              (<Navigate to="/nguoi-dung" replace />)
            } />
            <Route path="/lan-dau-google" element={(<><RedirectRegister /> <PageTitle title="Đăng ký tài khoản" /></>)} />
            <Route path="/404" element={<><FourOFour /> <PageTitle title="404 | Trang không tìm thấy"/></>} />
            <Route path="/*" element={<><FourOFour /> <PageTitle title="404 | Trang không tìm thấy"/></>} />

            {
              // Trang con của Sản phẩm
            
            <Route path="/san-pham/:urlName/" element={<ProductDetail username={username} />} />}
            <Route path="/san-pham/:urlName/:colorId" element={<ProductDetail username={username} />} />

            {
              //Trang con của Tin tức, blog
            }
            <Route path="/tin-tuc/*" element={<BlogDetail />} />
            <Route path="/ho-tro/*" element={<PolicyDetail />} />

            {
              //Trang con của Người dùng
            }
            <Route path="/nguoi-dung" element={
              username !== null ? (<><UserDetail username={username} avatar={avatar} /> <PageTitle title="Thông tin người dùng" /></>) :
              (<Navigate to="/dang-nhap" replace />)
            } />
            <Route path="/nguoi-dung/doi-mat-khau" element={
              username !== null ? (<><ChangePassword username={username} /> <PageTitle title="Đổi mật khẩu" /></>) :
              (<Navigate to="/dang-nhap" replace />)
            } />
            <Route path="/nguoi-dung/dia-chi" element={
              username !== null ? (<><UserAddress username={username} /> <PageTitle title="Địa chỉ người dùng" /></>) :
              (<Navigate to="/dang-nhap" replace />)
            } />
            <Route path="/nguoi-dung/lich-su-don-hang" element={
              username !== null ? (<><OrdersHistory username={username} /> <PageTitle title="Lịch sử đơn hàng" /></>) :
              (<Navigate to="/dang-nhap" replace />)
            } />
            
            <Route path="/gio-hang" element={
              username !== null ? <><Cart username={username} /> <PageTitle title="Giỏ hàng của bạn" /></> :
              (<Navigate to="/dang-nhap" replace />)
            } />
            <Route path="/thanh-toan" element={
              username !== null ? <><Order username={username} /> <PageTitle title="Thanh toán đơn hàng" /></> :
              (<Navigate to="/dang-nhap" replace />)
            } />
            <Route path="/thanh-toan/hoan-tat" element={
              username !== null ? <><OrderFinished /> <PageTitle title="Kết quả thanh toán" /></> :
              (<Navigate to="/dang-nhap" replace />)
            } />
          </Routes>
        </div>

        <BackToTop />
        <Footer />
      </Router>
    )
}
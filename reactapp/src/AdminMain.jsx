import FourOThree from './Admin/Shared/FourOThree';
import FourOFour from './Admin/Shared/FourOFour';

import BackToTop from "./Shared/BackToTop";
import PageTitle from "./Shared/PageTitle";
import PleaseWait from "./Shared/PleaseWait";

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
import APolicyArticle from "./Admin/Pages/PolicyArticle"
import APolicyArticleDetail from "./Admin/Pages/PolicyArticleDetail"
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
  const token = Cookies.get("employee_token");
  const pageId = getPageId(location.pathname);

  let [loading, setLoading] = useState(true);
  let [name, setName] = useState(null);
  let [username, setUsername] = useState(null);
  let [avatar, setAvatar] = useState(null);
  let [role, setRole] = useState(0);
  const [permission, setPermission] = useState([])

  useEffect(() => {
    fetch('/api/adminuser/cookie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify({ id: pageId })
    })
    .then(response => response.json())
    .then(data => { setLoading(false); setName(name = data.name); setUsername(username = data.username); setAvatar(avatar = data.avatar); setRole(role = data.roleId); setPermission(data.permissionGroup) })
    .catch(() => setLoading(false))
  }, []);

  function getPageId(path) {
    if (path.startsWith("/admin/thong-tin-san-pham") || path.startsWith("/admin/thong-tin-mau-sac-san-pham")) return 1;
    if (path.startsWith("/admin/chuong-trinh-giam-gia")) return 9;

    switch (path) {
      case "/" : case "/admin" : case "/admin/" : case "/admin/home" : case "/admin/thong-ke" : case "/admin/cai-dat-tai-khoan" : return 0;
      case "/admin/san-pham": return 1;
      case "/admin/loai-san-pham": return 2;
      case "/admin/thuong-hieu": return 3;
      case "/admin/the-thao": return 4;
      case "/admin/mau-sac": return 5;
      case "/admin/nhap-kho": return 6;
      case "/admin/thong-tin-nhap-kho": return 6;
      case "/admin/don-hang": return 7;
      case "/admin/don-hoan-tra": return 8;
      case "/admin/giam-gia": return 9;
      case "/admin/bai-blog": return 10;
      case "/admin/xem-bai-blog": return 10;
      case "/admin/chinh-sach": return 10;
      case "/admin/xem-chinh-sach": return 10;
      case "/admin/phan-quyen": return 11;
      case "/admin/chi-tiet-vai-tro": return 11;
      default: return -1;
    }
  }

  function renderBody() {  
    return (
      <Router>
        <ANav permission={permission} />
        <AHeader username={username} name={name} avatar={avatar} />
        <AWider />
        <div className="admin-main-container">
          <Routes>
            <Route path="/admin/home" element={<><AStatistic /> <PageTitle title="Trang chủ của quản trị viên" /></>} />
            <Route path="/admin/thong-ke" element={<><AStatistic /> <PageTitle title="Trang chủ của quản trị viên" /></>} />
            <Route path="/admin/cai-dat-tai-khoan" element={<><ASetting username={username} /> <PageTitle title="Cài đặt tài khoản"/></>} />
            <Route path="/admin/san-pham" element={permission.includes(1) ? <><AProduct /> <PageTitle title="Quản lý sản phẩm" /></> : <FourOThree />} />
            <Route path="/admin/thong-tin-san-pham/:id" element={permission.includes(1) ? <><AProductColor /> <PageTitle title="Quản lý màu sắc sản phẩm" /></> : <FourOThree />} />
            <Route path="/admin/thong-tin-mau-sac-san-pham/:id/:colorId" element={permission.includes(1) ? <><AProductDetail /> <PageTitle title="Quản lý chi tiết màu sắc sản phẩm" /></> : <FourOThree />} />
            <Route path="/admin/loai-san-pham" element={permission.includes(2) ? <><ACategory /> <PageTitle title="Quản lý loại sản phẩm" /></> : <FourOThree />} />
            <Route path="/admin/thuong-hieu" element={permission.includes(3) ? <><ABrand /> <PageTitle title="Quản lý thương hiệu" /></> : <FourOThree />} />
            <Route path="/admin/the-thao" element={permission.includes(4) ? <><ASport /> <PageTitle title="Quản lý môn thể thao" /></> : <FourOThree />} />
            <Route path="/admin/mau-sac" element={permission.includes(5) ? <><AColor /> <PageTitle title="Quản lý màu sắc" /></> : <FourOThree />} />
            <Route path="/admin/nhap-kho" element={permission.includes(6) ? <><AImport /> <PageTitle title="Quản lý nhập hàng" /></> : <FourOThree />} />
            <Route path="/admin/thong-tin-nhap-kho" element={permission.includes(6) ? <><AImportDetail name={name} /> <PageTitle title="Thông tin nhập hàng" /></> : <FourOThree />} />
            <Route path="/admin/don-hang" element={permission.includes(7) ? <><AOrder /> <PageTitle title="Quản lý đơn hàng đã đặt" /></> : <FourOThree />} />
            <Route path="/admin/don-hoan-tra" element={permission.includes(8) ? <><ARefund /> <PageTitle title="Quản lý trả hàng" /></> : <FourOThree />} />
            <Route path="/admin/giam-gia" element={permission.includes(9) ? <><APromotion /> <PageTitle title="Quản lý giảm giá" /></> : <FourOThree />} />
            <Route path="/admin/chuong-trinh-giam-gia/:id" element={permission.includes(9) ? <><APromotionDetail /> <PageTitle title="Chi tiết chương trình giám giá" /></> : <FourOThree />} />
            <Route path="/admin/bai-blog" element={permission.includes(10) ? <><ABlogArticle /> <PageTitle title="Quản lý bài blog" /></> : <FourOThree />} />
            <Route path="/admin/thong-tin-bai-blog" element={permission.includes(10) ? <><ABlogArticleDetail username={username} /> <PageTitle title="Quản lý thông tin trang blog" /></> : <FourOThree />} />
            <Route path="/admin/xem-bai-blog" element={permission.includes(10) ? <ABlogArticlePreview /> : <FourOThree />} />
            <Route path="/admin/chinh-sach" element={permission.includes(10) ? <><APolicyArticle /> <PageTitle title="Quản lý chính sách" /></> : <FourOThree />} />
            <Route path="/admin/thong-tin-chinh-sach" element={permission.includes(10) ? <><APolicyArticleDetail /> <PageTitle title="Quản lý thông tin chính sách" /></> : <FourOThree />} />
            <Route path="/admin/xem-chinh-sach" element={permission.includes(10) ? <ABlogArticlePreview /> : <FourOThree />} />
            <Route path="/admin/phan-quyen" element={permission.includes(11) ? <><APermission /> <PageTitle title="Phân quyền" /></> : <FourOThree />} />
            <Route path="/admin/chi-tiet-vai-tro" element={permission.includes(11) ? <><ARoleDetail /> <PageTitle title="Chi tiết vai trò" /></> : <FourOThree />} />

            <Route exact path="/" element={ <Navigate to="/admin/home" replace /> } />
            <Route exact path="/admin" element={ <Navigate to="/admin/home" replace /> } />
            <Route exact path="/admin/" element={ <Navigate to="/admin/home" replace /> } />

            <Route path="/admin/*" element={<><FourOFour /> <PageTitle title="404 | Trang không tìm thấy" /></>} />
          </Routes>
        </div>
        <BackToTop />
      </Router>
    )
  }

  return loading ? <PleaseWait /> : <>{renderBody()}</>;
}
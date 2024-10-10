import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Product from "./Pages/Product.jsx"
import ProductCategory from "./Pages/ProductCategory.jsx"
import Review from "./Pages/Review.jsx"
import Input from './Pages/Input.jsx'
import Order from './Pages/Order.jsx'
import Promotion from './Pages/Promotion.jsx'
import User from './Pages/User.jsx'
import BlogArticle from "./Pages/BlogArticle.jsx"
import Permission from './Pages/Permission.jsx'
import Statistic from './Pages/Statistic.jsx'

import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import Nav from './Shared/Nav.jsx'

function RenderMain() {
  return (
    <Router>
      <Routes>
        <Route path="/san-pham" element={<Product />} />
        <Route path="/loai-san-pham" element={<ProductCategory />} />
        <Route path="/review" element={<Review />} />
        <Route path="/nhap-kho" element={<Input />} />
        <Route path="/don-hang" element={<Order />} />
        <Route path="/giam-gia" element={<Promotion />} />
        <Route path="/tai-khoan-khach-hang" element={<User />} />
        <Route path="/bai-blog" element={<BlogArticle />} />
        <Route path="/phan-quyen" element={<Permission />} />
        <Route path="/thong-ke" element={<Statistic />} />
      </Routes>
    </Router>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Nav />
    <main>
      { RenderMain() }
    </main>
  </StrictMode>,
)

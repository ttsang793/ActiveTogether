import "./Nav.css"
import NavButton from "./NavButton"

export default function Nav() {
  return (
    <nav className="nav-buttons">
      <div className="text-center py-3">
        <img src="/logo.png" alt="AT Logo" className="nav-logo" />
      </div>

      <ul className="nav-list">
        <NavButton url="/admin/thong-ke" icon="bi-house-door-fill" name="Trang chủ" />
        <NavButton url="/admin/san-pham" icon="bi-box-fill" name="Sản phẩm" />
        <NavButton url="/admin/loai-san-pham" icon="bi-inboxes-fill" name="Loại sản phẩm" />
        <NavButton url="/admin/thuong-hieu" icon="bi-tags-fill" name="Thương hiệu" />
        <NavButton url="/admin/the-thao" icon="bi-dribbble" name="Môn thể thao" />
        <NavButton url="/admin/mau-sac" icon="bi-palette-fill" name="Màu sắc" />
        <NavButton url="/admin/nhap-kho" icon="bi-clipboard-plus-fill" name="Nhập kho" />
        <NavButton url="/admin/don-hang" icon="bi-cart-check-fill" name="Đơn hàng của khách" />
        <NavButton url="/admin/don-hoan-tra" icon="bi-cart-dash-fill" name="Đơn hoàn trả" />
        <NavButton url="/admin/giam-gia" icon="bi-graph-down-arrow" name="Chương trình giảm giá" />
        <NavButton url="/admin/bai-blog" icon="bi-newspaper" name="Bài blog" />
        <NavButton url="/admin/phan-quyen" icon="bi-person-fill-gear" name="Phân quyền" />
      </ul>
    </nav>
  )
}
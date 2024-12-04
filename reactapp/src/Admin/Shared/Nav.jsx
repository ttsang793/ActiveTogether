import "./Nav.css"
import NavButton from "./NavButton"

export default function Nav({permission}) {
  return (
    <nav className="nav-buttons">
      <div className="text-center py-3">
        <img src="/logo.png" alt="AT Logo" className="nav-logo" />
      </div>

      <ul className="nav-list">
        <NavButton url="/admin/thong-ke" icon="bi-house-door" name="Trang chủ" />
        { permission.includes(1) && <NavButton url="/admin/san-pham" icon="bi-box" name="Sản phẩm" /> }
        { permission.includes(2) && <NavButton url="/admin/loai-san-pham" icon="bi-inboxes" name="Loại sản phẩm" /> }
        { permission.includes(3) && <NavButton url="/admin/thuong-hieu" icon="bi-tags-fill" name="Thương hiệu" /> }
        { permission.includes(4) && <NavButton url="/admin/the-thao" icon="bi-dribbble" name="Môn thể thao" /> }
        { permission.includes(5) && <NavButton url="/admin/mau-sac" icon="bi-palette" name="Màu sắc" /> }
        { permission.includes(6) && <NavButton url="/admin/nhap-kho" icon="bi-clipboard-plus" name="Nhập kho" /> }
        { permission.includes(7) && <NavButton url="/admin/don-hang" icon="bi-cart-check" name="Đơn hàng của khách" /> }
        { permission.includes(8) && <NavButton url="/admin/don-hoan-tra" icon="bi-cart-dash" name="Đơn hoàn trả" /> }
        { permission.includes(9) && <NavButton url="/admin/giam-gia" icon="bi-graph-down-arrow" name="Chương trình giảm giá" /> }
        { permission.includes(10) && <NavButton url="/admin/bai-blog" icon="bi-newspaper" name="Bài blog" /> }
        { permission.includes(11) && <NavButton url="/admin/phan-quyen" icon="bi-person-fill-gear" name="Phân quyền" /> }
      </ul>
    </nav>
  )
}
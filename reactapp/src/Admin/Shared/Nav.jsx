import "./Nav.css"

export default function Nav() {
  return (
    <nav className="nav-buttons">
      <div className="text-center py-3">
        <img src="/logo.png" alt="AT Logo" className="nav-logo" />
      </div>

      <ul className="nav-list">
        <a href="/admin/thong-ke" className="nav-link"><li className="nav py-2 ps-2 pe-4 mb-1">Trang chủ</li></a>
        <a href="/admin/san-pham" className="nav-link"><li className="nav py-2 ps-2 pe-4 mb-1">Sản phẩm</li></a>
        <a href="/admin/loai-san-pham" className="nav-link"><li className="nav py-2 ps-2 pe-4 mb-1">Loại sản phẩm</li></a>
        <a href="/admin/thuong-hieu" className="nav-link"><li className="nav py-2 ps-2 pe-4 mb-1">Thương hiệu</li></a>
        <a href="/admin/the-thao" className="nav-link"><li className="nav py-2 ps-2 pe-4 mb-1">Môn thể thao</li></a>
        <a href="/admin/review" className="nav-link"><li className="nav py-2 ps-2 pe-4 mb-1">Review khách hàng</li></a>
        <a href="/admin/nhap-kho" className="nav-link"><li className="nav py-2 ps-2 pe-4 mb-1">Nhập kho</li></a>
        <a href="/admin/don-hang" className="nav-link"><li className="nav py-2 ps-2 pe-4 mb-1">Đơn hàng của khách</li></a>
        <a href="/admin/don-hoan-tra" className="nav-link"><li className="nav py-2 ps-2 pe-4 mb-1">Đơn hoàn trả</li></a>
        <a href="/admin/giam-gia" className="nav-link"><li className="nav py-2 ps-2 pe-4 mb-1">Chương trình giảm giá</li></a>
        <a href="/admin/bai-blog" className="nav-link"><li className="nav py-2 ps-2 pe-4 mb-1">Bài blog</li></a>
        <a href="/admin/phan-quyen" className="nav-link"><li className="nav py-2 ps-2 pe-4 mb-1">Phân quyền</li></a>
      </ul>
    </nav>
  )
}
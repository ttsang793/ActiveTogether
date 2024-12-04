import "./FourOFour.css"

export default function FourOFour() {
  return (
    <main className="a-four-o-four-container">
      <img src="/404.png" alt="Lỗi 404" className="four-o-four-img" />
      <h1 className="fw-bold">TRANG KHÔNG TỒN TẠI</h1>
      <div className="four-o-four-detail">Vui lòng liên hệ với quản trị viên!</div>
      <div>
        <a href="/admin/home">
          <button className="at-btn me-2">Trang chủ</button>
        </a>
        <button className="at-btn" onClick={() => history.back()}>Quay về trang trước</button>
      </div>
    </main>
  )
}
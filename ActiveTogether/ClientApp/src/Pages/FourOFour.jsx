import "./404.css"

export default function FourOFour() {
  return (
    <main className="four-o-four-container">
      <img src="/404.png" alt="Lỗi 404" className="four-o-four-img" />
      <h1 className="fw-bold">TRANG BẠN TRUY CẬP KHÔNG TỒN TẠI</h1>
      <div className="four-o-four-detail">Có thể URL bạn vừa nhập không chính xác, hoặc trang không còn tồn tại.</div>
      <div>
        <a href="/">
          <button className="at-btn me-2">Trang chủ</button>
        </a>
        <button className="at-btn" onClick={() => history.back()}>Quay về trang trước</button>
      </div>
    </main>
  )
}
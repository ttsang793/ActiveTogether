import "./Footer.css"

function Footer() {
  return (
    <footer className="pt-3 pb-2">
      <div className="row m-0">
        <div className="col-3 px-1">
          <h1>HỖ TRỢ</h1>
          <ul>
            <li><a href="">Chính sách vận chuyển</a></li>
            <li><a href="">Chính sách trả hàng</a></li>
            <li><a href="">Tư vấn kích thước</a></li>
            <li><a href="">Báo cáo</a></li>
          </ul>
        </div>
        <div className="col-3 px-1">
          <h1>KẾT NỐI</h1>
          <ul list-style-type="none">
            <li><i className="bi bi-facebook"></i> activetogethersportvn</li>
            <li><i className="bi bi-instagram"></i> activetogethersportvn</li>
            <li><i className="bi bi-tiktok"></i> activetogethersportvn</li>
          </ul>
        </div>
        <div className="col-6 px-1">
          <h1>LIÊN HỆ</h1>
          <ul list-style-type="none">
            <li><i className="bi bi-telephone-fill"></i> : 0903 327 327</li>
            <li><i className="bi bi-envelope-fill"></i> : activetogethersport@gmail.com</li>
            <li><i className="bi bi-house-door-fill"></i> : 23 Âu Dương Lân, phường Rạch Ông, quận 8, TP. Hồ Chí Minh</li>
          </ul>
        </div>
      </div>
      <hr className="mt-0 mb-2" />
      <div className="text-center fst-italic">
        &copy; {new Date().getFullYear()} by Active Together
      </div>
    </footer>
  );
}

export default Footer;
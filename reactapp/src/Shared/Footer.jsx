import "./Footer.css"

function Footer() {
  return (
    <footer>
      <div className="row detail-address">
        <div className="col px-1 left">
          <h1>HỖ TRỢ</h1>
          <ul>
            <li><a href="">Chính sách vận chuyển</a></li>
            <li><a href="">Chính sách trả hàng</a></li>
            <li><a href="">Tư vấn kích thước</a></li>
            <li><a href="">Báo cáo</a></li>
          </ul>
        </div>
        <div className="col px-1">
          <h1>LIÊN HỆ</h1>
          <ul list-style-type="none">
            <li><i className="bi bi-telephone-fill"></i> : 0903 327 327</li>
            <li><i className="bi bi-envelope-fill"></i> : contact@atsport.com</li>
            <li><i className="bi bi-house-door-fill"></i> : 23 Âu Dương Lân, phường Rạch Ông, quận 8, TP. Hồ Chí Minh</li>
            <li>Theo dõi Active Together:&nbsp;
              <i className="bi bi-facebook"></i> &nbsp;
              <i className="bi bi-instagram"></i> &nbsp;
              <i className="bi bi-tiktok"></i>
            </li>
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
import "./Header.css"
// import placeholder from "./img/placeholder.png" (chen hinh rieng tu)

function Header() {
  return (
    <header>
      <div className="d-flex top">
        <input type="text" placeholder="Nhập nội dung tìm kiếm" className="flex-grow-1 search px-3"></input>
        <abbr title="Facebook"><i className="bi bi-facebook px-2 hover"></i></abbr>
        <abbr title="Instagram"><i className="bi bi-instagram px-2 hover"></i></abbr>
        <abbr title="TikTok"><i className="bi bi-tiktok px-2 hover"></i></abbr>
        <a href="/gio-hang">
          <abbr title="Giỏ hàng"><i className="bi bi-cart px-2 hover"></i></abbr>
        </a>
      </div>

      <div className="d-flex justify-content-center align-items-center nav">
        <img src="/background.jpg" className="background" />
        <a href="/">
          <button className="nav-btn hover">TRANG CHỦ</button>
        </a>
        <a href="/san-pham">
          <button className="nav-btn hover">SẢN PHẨM</button>
        </a>
        <img className="logo" src="/logo.png" />        
        <a href="/gioi-thieu">
          <button className="nav-btn hover">GIỚI THIỆU</button>
        </a>
        <a href="/tin-tuc">
          <button className="nav-btn hover">TIN TỨC</button>
        </a>
      </div>
    </header>
  );
}

export default Header;
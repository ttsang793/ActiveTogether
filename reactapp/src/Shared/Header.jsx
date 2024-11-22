import "./Header.css"
import { useState } from "react";

export default function Header() {
  const [search, setSearch] = useState("");
  const handleSearch = e => setSearch(e.target.value);

  window.addEventListener("resize", () => {
    document.getElementById('phone-menu').classList.add("disabled");
    document.body.style.overflow = 'initial';
  });
  
  function HandlePhoneMenu() {
    if (document.getElementById("phone-menu").classList.contains("disabled")) {
      document.getElementById("phone-menu").classList.remove("disabled");
      document.body.style.overflow = "hidden";
    }
    else {
      document.getElementById("phone-menu").classList.add("disabled");
      document.body.style.overflow = "initial";
    }
  }

  function PhoneMenuOff() {
    document.getElementById("phone-menu").classList.add("disabled");
    document.body.style.overflow = "initial";
  }

  function SearchIconOff() {
    document.getElementsByClassName("bi-search")[0].classList.add("disabled");
  }

  function SearchIconOn() {
    document.getElementsByClassName("bi-search")[0].classList.remove("disabled");
  }

  function Logout() {
    localStorage.removeItem("userLogin");
    location.href = "/";
  }

  function RedirectToSearch() {
    if (search === null) {
      alert("Vui lòng nhập thông tin tìm kiểm");
      return;
    }
    location.href = `/san-pham?search=${search}`;
  }

  function renderLoginBtn() {
    const username = localStorage.getItem("userLogin");
    return (username === null) ? (
      <a href="/dang-nhap">
        <button id="loginBtn" className="login-btn">
          <i className="bi bi-box-arrow-in-right"></i>
          <span>&nbsp;Đăng nhập</span>
        </button>
      </a>
    ) : (
      <div>
        <button type="button" className="btn account-btn" data-bs-toggle="dropdown">
          <img src="/src/images/avatar.jpg" alt="username" className="dropdown-avatar" />
          <span>&nbsp;{username}</span>
        </button>
        <ul className="dropdown-menu">
          <li className="pointer">
            <a href="/nguoi-dung/lich-su-don-hang">
              <i className="bi bi-clock"></i>
              <span>Lịch sử mua hàng</span>
            </a>
          </li>
          <li className="pointer">
            <a href="/nguoi-dung">
              <i className="bi bi-gear"></i>
              <span>Cài đặt</span>
            </a>
          </li>
          <li className="pointer">
            <div onClick={Logout}>
              <i className="bi bi-box-arrow-in-left"></i>
              <span>Đăng xuất</span>
            </div>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <header className="user-header">
      <div className="d-flex top">
        <input type="search" placeholder="Nhập nội dung tìm kiếm" id="search" value={search} onChange={handleSearch}
          className="flex-grow-1 search px-3" onFocus={SearchIconOn} />
        <div onClick={RedirectToSearch}>
          <abbr className="pointer" title="Tìm sản phẩm"><i className="bi bi-search disabled"></i></abbr>
        </div>
        <a href="/gio-hang">
          <abbr className="pointer" title="Giỏ hàng"><i className="bi bi-cart px-2"></i></abbr>
        </a>
        { renderLoginBtn() }
        <i className="bi bi-list px-2 hamburger" onClick={HandlePhoneMenu}></i>
      </div>

      <div id="phone-menu" className="phone-menu disabled">
        <div className="phone-menu-background" onClick={PhoneMenuOff}></div>
        <div className="phone-menu-list">
          <i className="bi bi-x" onClick={PhoneMenuOff}></i>
          <a href="/">
            <button className="nav-btn">Trang chủ</button>
          </a>
          <a href="/san-pham">
            <button className="nav-btn">Sản phẩm</button>
          </a>
          <a href="/gioi-thieu">
            <button className="nav-btn">Giới thiệu</button>
          </a>
          <a href="/tin-tuc">
            <button className="nav-btn">Tin tức</button>
          </a>
        </div>
      </div>

      <div className="position-relative">
        <img src="/background.jpg" className="nav-background" />
        <div className="nav">
          <a href="/">
            <button className="nav-btn">TRANG CHỦ</button>
          </a>
          <a href="/san-pham">
            <button className="nav-btn">SẢN PHẨM</button>
          </a>
          <img className="logo" src="/logo.png" />
          <a href="/gioi-thieu">
            <button className="nav-btn">GIỚI THIỆU</button>
          </a>
          <a href="/tin-tuc">
            <button className="nav-btn">TIN TỨC</button>
          </a>
        </div>
      </div>
    </header>
  );
}
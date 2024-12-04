import "./Header.css"
import { auth } from "/firebase";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";

export default function AHeader(props) {
  const handleSetting = () => {
    location.href = "/admin/cai-dat-tai-khoan"
  }

  const handleLogout = () => {
    if (confirm("Bạn có muốn đăng xuất ra khỏi hệ thống admin?")) {
      fetch("/api/adminuser/logout", { method: "POST" }).then(() => signOut(auth).then(() => {
        Cookies.remove("employee_token");
        location.href = "/admin"
      }));
    }
  }

  return (
    <header className="d-flex admin-header">
      <img src={props.avatar} alt={props.name} />
      <div className="flex-grow-1 ms-2 fst-italic fw-semibold">{props.username} &minus; {props.name}</div>
      <div className="pointer header-button py-2 px-3" onClick={handleSetting}>
        <i className="bi bi-gear"></i>&nbsp;
        <span>Cài đặt</span>
      </div>
      <div className="pointer header-button py-2 px-3" onClick={handleLogout}>
        <i className="bi bi-box-arrow-in-left"></i>&nbsp;
        <span>Đăng xuất</span>
      </div>
    </header>
  )
}
import "./Header.css"

export default function AHeader() {
  const handleSetting = () => {
    location.href = "/admin/cai-dat-tai-khoan"
  }

  const handleLogout = () => {
    if (confirm("Bạn có muốn đăng xuất ra khỏi hệ thống admin?"))
    location.href = "/admin";
  }

  return (
    <header className="d-flex admin-header">
      <div className="flex-grow-1 fst-italic fw-semibold">240523 &minus; Trần Tuấn Sang</div>
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
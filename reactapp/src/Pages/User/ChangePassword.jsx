import "/src/Pages/user/Login.css";
import { useState } from 'react';
import { Encode } from "/src/Scripts/Utility";
import FormTextBox from "/src/Components/shared/FormTextBox";

export default function ChangePassword() {
  let [oldPass, setOldPass] = useState("");
  let [newPass, setNewPass] = useState("");
  let [conPass, setConPass] = useState("");
  let [oldPassError, setOldPassError] = useState("");
  let [newPassError, setNewPassError] = useState("");
  let [conPassError, setConPassError] = useState("");

  const handleOldPass = e => {
    setOldPass(oldPass = e.target.value);
    handleOldPassError();
  }

  const handleNewPass = e => {
    setNewPass(newPass = e.target.value);
    handleNewPassError();
  }

  const handleConPass = e => {
    setConPass(conPass = e.target.value);
    handleConPassError();
  }

  const handleOldPassError = () => {
    let oError = "";

    if (oldPass === "") oError = "Vui lòng nhập mật khẩu cũ";
    else if (!oldPass.match(/^.{6,}$/gm)) oError = "Mật khẩu phải từ 6 kí tự trở lên";

    setOldPassError(oldPassError = oError);
    handleNewPassError();
  }

  const handleNewPassError = () => {
    let nError = "";

    if (newPass === "") nError = "Vui lòng nhập mật khẩu mới";
    else if (!newPass.match(/^.{6,}$/gm)) nError = "Mật khẩu phải từ 6 kí tự trở lên";
    else if (oldPass === newPass) nError = "Mật khẩu mới phải khác mật khẩu cũ";

    setNewPassError(newPassError = nError);
    handleConPassError();
  }

  const handleConPassError = () => {
    let cError = "";

    if (conPass === "") cError = "Vui lòng xác nhận mật khẩu mới";
    else if (!conPass.match(/^.{6,}$/gm)) cError = "Mật khẩu phải từ 6 kí tự trở lên";
    else if (newPass !== conPass) cError = "Xác nhận mật khẩu phải trùng khớp với mật khẩu";

    setConPassError(conPassError = cError);
  }

  async function update(e) {
    e.preventDefault();

    handleOldPassError();
    handleNewPassError();
    handleConPassError();

    if (!(oldPassError === "" && newPassError === "" && conPassError === "")) return;

    if (confirm("Bạn có muốn cập nhật mật khẩu?")) {
      const username = localStorage.getItem("userLogin");
      const response = await fetch(`/user/update?username=${username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ old: Encode(username, oldPass), new: Encode(username, newPass) })
      })
  
      if (response.ok) { alert("Cập nhật mật khẩu thành công. Vui lòng đăng nhập lại"); localStorage.removeItem("userLogin"); location.reload() }
      else alert("Đã có lỗi xảy ra, cập nhật mật khẩu thất bại.");
    }
  }

  return (
    <main className="login-main">
      <h1 className="flex-grow-1 text-center fw-bold">ĐỔI MẬT KHẨU</h1>
      <hr />
      <form className="login-form" id="change-password-form">
        <FormTextBox type="oldPassword" placeholder="Mật khẩu cũ" icon="bi-lock-fill" value={oldPass} onValueChange={handleOldPass} errorValue={oldPassError} />
        <FormTextBox type="newPassword" placeholder="Mật khẩu mới" icon="bi-lock-fill" value={newPass} onValueChange={handleNewPass} errorValue={newPassError} />
        <FormTextBox type="vertifiedPassword" placeholder="Xác nhận mật khẩu" icon="bi-lock-fill" value={conPass} onValueChange={handleConPass} errorValue={conPassError} />

        <input type="submit" value="Thay đổi mật khẩu" className="at-btn m-at-btn me-2" onClick={e => update(e)} />
        <input type="button" value="Hủy" className="at-btn at-btn-secondary m-at-btn" onClick={() => location.href = "/nguoi-dung"} />
      </form>
    </main>
  )
}
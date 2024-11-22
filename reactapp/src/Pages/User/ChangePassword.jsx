import "/src/Pages/user/Login.css";
import { useState } from 'react';
import { Encode } from "/src/Scripts/Utility";
import FormTextBox from "/src/Components/shared/FormTextBox";

export default function ChangePassword() {
  let [oldPass, setOldPass] = useState("");
  let [newPass, setNewPass] = useState("");
  let [conPass, setConPass] = useState("");

  const handleOldPass = o => setOldPass(oldPass = o);
  const handleNewPass = n => setNewPass(newPass = n);
  const handleConPass = c => setConPass(conPass = c);

  async function update(e) {
    e.preventDefault();
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
        <FormTextBox type="oldPassword" placeholder="Mật khẩu cũ" icon="bi-lock-fill" onValueChange={handleOldPass} />
        <FormTextBox type="newPassword" placeholder="Mật khẩu mới" icon="bi-lock-fill" onValueChange={handleNewPass} />
        <FormTextBox type="vertifiedPassword" placeholder="Xác nhận mật khẩu" icon="bi-lock-fill" onValueChange={handleConPass} />

        <input type="submit" value="Thay đổi mật khẩu" className="at-btn m-at-btn" onClick={e => update(e)} />
      </form>
    </main>
  )
}
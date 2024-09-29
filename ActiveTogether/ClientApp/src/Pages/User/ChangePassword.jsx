import "/src/Pages/Login.css";
import FormTextBox from "/src/Components/FormTextBox";

export default function ChangePassword() {
  return (
    <main>
      <h1 className="flex-grow-1 text-center fw-bold">ĐỔI MẬT KHẨU</h1>
      <hr />
      <div className="login-form" id="change-password-form">

        <FormTextBox type="oldPassword" placeholder="Nhập mật khẩu cũ" icon="bi-lock-fill" />
        <FormTextBox type="newPassword" placeholder="Nhập mật khẩu mới" icon="bi-lock-fill" />
        <FormTextBox type="vertifiedPassword" placeholder="Xác nhận mật khẩu mới" icon="bi-lock-fill" />

        <input type="submit" value="Thay đổi mật khẩu" className="at-btn m-at-btn" />
      </div>
    </main>
  )
}
import FormTextBox from "/src/Components/FormTextBox";

export default function UserDetail() {
  return (
    <main>
      <h1 className="flex-grow-1 text-center fw-bold">THÔNG TIN CỦA NGƯỜI DÙNG</h1>
      <hr />
      <form className="login-form" id="change-password-form">

        <FormTextBox type="username" placeholder="Username" icon="bi-lock-fill" readonly={true} />
        <FormTextBox type="fullname" placeholder="Họ và tên" icon="bi-lock-fill" />
        <FormTextBox type="phone" placeholder="Số điện thoại" icon="bi-lock-fill" />
        <FormTextBox type="email" placeholder="Email" icon="bi-lock-fill" />
        <FormTextBox type="address" placeholder="Địa chỉ" icon="bi-lock-fill" />

        <div>
          <a href="doi-mat-khau" className="me-2">
            <input type="button" value="Thay đổi mật khẩu" className="at-btn m-at-btn" />
          </a>

          <a href="lich-su-don-hang">
            <input type="button" value="Lịch sử đơn hàng" className="at-btn m-at-btn" />
          </a>
        </div>

        <input type="submit" value="Lưu thông tin" className="at-btn m-at-btn" />
      </form>
    </main>
  )
}
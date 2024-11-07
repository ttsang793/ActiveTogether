import FormTextBox from "/src/Components/FormTextBox";
import { Component } from "react";

export default class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, username: "", fullName: "", phone: "", email: "" }
  }

  componentDidMount() {
    this.populateUserDetail();
  }

  async populateUserDetail() {
    const username = localStorage.getItem("userLogin");
    fetch(`/user?username=${username}`).then(response => response.json()).then(data => {
      this.setState({ loading: false, username: data.username, fullName: data.fullName, phone: data.phone, email: data.email });
    })
  }

  handleFullNameChange = newFullName => this.setState({fullName: newFullName});
  handlePhoneChange = newPhone => this.setState({phone: newPhone});
  handleEmailChange = newEmail => this.setState({email: newEmail});

  render() {
    return this.state.loading ? "Please wait..." : (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">THÔNG TIN CỦA NGƯỜI DÙNG</h1>
        <hr />
        <form className="login-form" id="change-detail-form">

          <FormTextBox type="username" placeholder="Username" icon="bi-lock-fill" readonly={true} value={this.state.username} />
          <FormTextBox type="full-name" placeholder="Họ và tên" icon="bi-lock-fill" value={this.state.fullName} onValueChange={this.handleFullNameChange} />
          <FormTextBox type="phone" placeholder="Số điện thoại" icon="bi-lock-fill" value={this.state.phone} onValueChange={this.handlePhoneChange} />
          <FormTextBox type="email" placeholder="Email" icon="bi-lock-fill" value={this.state.email} onValueChange={this.handleEmailChange} />

          <div>
            <a href="/nguoi-dung/doi-mat-khau" className="me-2">
              <input type="button" value="Thay đổi mật khẩu" className="small-at-btn-secondary m-at-btn" />
            </a>
            
            <a href="/nguoi-dung/dia-chi" className="me-2">
              <input type="button" value="Thêm địa chỉ" className="small-at-btn-secondary m-at-btn" />
            </a>

            <a href="/nguoi-dung/lich-su-don-hang">
              <input type="button" value="Lịch sử đơn hàng" className="small-at-btn-secondary m-at-btn" />
            </a>
          </div>

          <input type="submit" value="Lưu thông tin" onClick={e => this.updateInfo(e)} className="at-btn m-at-btn" />
        </form>
      </main>
    )
  }

  async updateInfo(e) {
    e.preventDefault();
    if (confirm("Bạn có muốn cập nhật thông tin tài khoản?")) {
      const response = await fetch(`/user/updateInfo?username=${this.state.username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ fullName: this.state.fullName, phone: this.state.phone, email: this.state.email })
      })
  
      if (response.ok) { alert("Tài khoản đã được cập nhật thành công"); location.reload() }
      else alert("Đã có lỗi xảy ra, cập nhật tài khoản thất bại.");
    }    
  }
}
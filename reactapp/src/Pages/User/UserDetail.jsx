import FormTextBox from "/src/Components/shared/FormTextBox";
import PleaseWait from "/src/Shared/PleaseWait"
import { useState, Component } from "react";
import "./UserDetail.css"

function UserDetailPartial(props) {
  const username = props.user.username;
  let [fullName, setFullName] = useState(props.user.fullName);
  let [phone, setPhone] = useState(props.user.phone);
  let [email, setEmail] = useState(props.user.email);
  let [avatar, setAvatar] = useState(props.user.avatar);
  let [errorFullName, setErrorFullName] = useState("");
  let [errorPhone, setErrorPhone] = useState("");
  let [errorEmail, setErrorEmail] = useState("");
  
  const handleFullNameChange = newFullName => setFullName(fullName = newFullName);
  const handlePhoneChange = newPhone => setPhone(phone = newPhone);
  const handleEmailChange = newEmail => setEmail(email = newEmail);  
  const handleFullNameError = newErrorFullName => setErrorFullName(errorFullName = newErrorFullName);
  const handlePhoneError = newErrorPhone => setErrorPhone(errorPhone = newErrorPhone);
  const handleEmailError = newErrorEmail => setErrorEmail(errorEmail = newErrorEmail);

  const updateInfo = e => {
    e.preventDefault();
    props.updateInfo({username, fullName, phone, email});
  }

  return (
    <main className="user-main">
      <h1 className="text-center fw-bold">THÔNG TIN CỦA NGƯỜI DÙNG</h1>
      <hr />
      <form className="login-form d-flex flex-column align-items-center" id="change-detail-form">
        <div className="d-flex c-10 w-100">
          <div className="flex-1">
            <FormTextBox type="username" placeholder="Username" icon="bi-lock-fill" readonly={true} value={username} />
            <FormTextBox type="full-name" placeholder="Họ và tên" icon="bi-lock-fill" value={fullName} onValueChange={handleFullNameChange} errorValue={errorFullName} />
            <FormTextBox type="phone" placeholder="Số điện thoại" icon="bi-lock-fill" value={phone} onValueChange={handlePhoneChange} errorValue={errorPhone} />
            <FormTextBox type="email" placeholder="Email" icon="bi-lock-fill" value={email} onValueChange={handleEmailChange} errorValue={errorEmail} />
          </div>

          <div className="avatar-container">
            <img src={avatar} alt="avatar" className="avatar" />
            <input type="file" id="upload-thumbnail" accept="image/*" className="disabled" />
            <input type="button" value="Chọn avatar" onClick={() => document.getElementById('upload-thumbnail').click()} className="small-at-btn mb-2" />
          </div>
        </div>

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

        <input type="submit" value="Lưu thông tin" onClick={e => updateInfo(e)} className="at-btn m-at-btn" />
      </form>
    </main>    
  )

}

export default class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, user: {} }
  }

  componentDidMount() {
    this.populateUserDetail();
  }

  async populateUserDetail() {
    const username = localStorage.getItem("userLogin");
    fetch(`/user?username=${username}`).then(response => response.json()).then(data => {
      this.setState({ loading: false, user: data });
    })
  }

  handleFullNameChange = newFullName => this.setState({fullName: newFullName});
  handlePhoneChange = newPhone => this.setState({phone: newPhone});
  handleEmailChange = newEmail => this.setState({email: newEmail});

  render() {
    return this.state.loading ? <PleaseWait /> : <UserDetailPartial user={this.state.user} updateInfo={this.updateInfo} />
  }

  async updateInfo(usr) {
    if (confirm("Bạn có muốn cập nhật thông tin tài khoản?")) {
      const response = await fetch(`/user/updateInfo?username=${usr.username}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(usr)
      })
  
      if (response.ok) { alert("Tài khoản đã được cập nhật thành công"); location.reload() }
      else alert("Đã có lỗi xảy ra, cập nhật tài khoản thất bại.");
    }
  }
}
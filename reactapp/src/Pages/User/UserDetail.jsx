import FormTextBox from "/src/Components/shared/FormTextBox";
import axios from 'axios';
import PleaseWait from "/src/Shared/PleaseWait";
import { useState, Component } from "react";
import { auth } from "/firebase";
import { reauthenticateWithCredential, verifyBeforeUpdateEmail, EmailAuthProvider, deleteUser } from 'firebase/auth';
import "./UserDetail.css";

function UserDetailPartial(props) {
  const username = props.user.username;
  let [fullName, setFullName] = useState(props.user.fullName);
  let [phone, setPhone] = useState(props.user.phone);
  let [email, setEmail] = useState(props.user.email);
  let [password, setPassword] = useState("");
  let [disablePassword, setDisablePassword] = useState(true);
  const oldEmail = props.user.email;
  let [avatar, setAvatar] = useState(props.user.avatar);
  let [errorFullName, setErrorFullName] = useState("");
  let [errorPhone, setErrorPhone] = useState("");
  let [errorEmail, setErrorEmail] = useState("");
  let [errorPassword, setErrorPassword] = useState("");

  const handleFullNameChange = e => {
    setFullName(fullName = e.target.value);
    handleFullNameError();
  }

  const handlePhoneChange = e => {
    setPhone(phone = e.target.value);
    handlePhoneError();
  }

  const handleEmailChange = e => {
    setEmail(email = e.target.value);
    handleEmailError();
  }

  const handlePassword = e => {
    setPassword(password = e.target.value);
    handlePasswordError();
  }

  const handleFullNameError = () => {
    let error = "";
    if (fullName === "") error = "Vui lòng nhập tên đầy đủ của bạn";
    setErrorFullName(errorFullName = error);
  }

  const handleDisabledPassword = () => {
    setDisablePassword(disablePassword = false);
    setErrorPassword(errorPassword = "Vui lòng nhập mật khẩu để hoàn thành tác vụ");
  }

  const handlePhoneError = () => {
    let error = "";
    if (phone === "") error = "Số điện thoại không được để trống";
    else if (!phone.match(/^0(([3,5,7,8,9][0-9]{8})|([2][0-9]{9}))$/gm)) error = "Số điện thoại phải đúng định dạng (10 hoặc 11 số)";
    setErrorPhone(errorPhone = error);
  }

  const handleEmailError = () => {
    let error = "";
    if (email === "") error = "Email không được để trống";
    else if (!email.match(/.+@[a-z]+(\.[a-z]*)+/gm)) error = "Email phải đúng định dạng (example@mail.com)";
    setErrorEmail(errorEmail = error);
  }

  const handlePasswordError = () => {
    let error = "";
    if (!disablePassword && password === "") error = "Vui lòng nhập mật khẩu";
    setErrorPassword(error);
  }

  function handleFileUpload(e) {
    setAvatar(e.target.files[0]);

    var reader = new FileReader();
    reader.onload = e => document.getElementById('avatar').src = e.target.result;
    reader.readAsDataURL(e.target.files[0]);
  }

  async function uploadImage() {
    const formData = new FormData();
    formData.append('file', avatar);

    try {
      const response = await axios.post('/user/avatar/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.status === 200;
    }
    catch (error) {
      return false;
    }
  }

  async function updateInfo(e) {
    e.preventDefault();

    handleFullNameError();
    handlePhoneError();
    handleEmailError();
    handlePasswordError();

    if (!(errorFullName === "" && errorPhone === "" && errorEmail === "")) return;

    if (email !== oldEmail && disablePassword) {
      handleDisabledPassword();
      return;
    }

    if (confirm("Bạn có muốn cập nhật thông tin tài khoản?")) {
      const username = props.user.username;
      let image = "";

      if (typeof (avatar) !== "string")
        image = "/src/images/avatar/" + username + avatar.name.substring(avatar.name.lastIndexOf("."));
      else image = avatar;

      const response = await fetch(`/user/updateInfo?username=${username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ fullName, phone, email, avatar: image })
      });

      if ((typeof (avatar) === "string" || uploadImage()) && response.ok) {
        alert("Tài khoản đã được cập nhật thành công");
        if (email !== oldEmail) {
          const userAuth = auth.currentUser;
          const credential = EmailAuthProvider.credential(oldEmail, password);

          reauthenticateWithCredential(userAuth, credential)
            .then(() => {
              verifyBeforeUpdateEmail(userAuth, email)
                .then(() => {
                  alert("Vui lòng kiểm tra email mới của bạn để tiếp tục xác nhận thay đổi email.");
                  fetch("/user/logout", { method: "POST" }).then(() => location.reload());
                });
            });
        }
      }
      else alert("Đã có lỗi xảy ra, cập nhật tài khoản thất bại.");
    }
  }

  async function lockAccount(e) {
    e.preventDefault();

    if (disablePassword) {
      handleDisabledPassword();
      return;
    }

    if (confirm("Bạn có muốn nói lời chia tay với Active Together?")) {
      const userAuth = auth.currentUser;
      const credential = EmailAuthProvider.credential(userAuth.email, password);

      const response = await fetch(`/user/lock?username=${username}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });

      if (response.ok) {
        await reauthenticateWithCredential(userAuth, credential);
        await deleteUser(userAuth);
        alert("Tạm biệt bạn nhé, hi vọng chúng ta sẽ gặp lại nhau - Active Together");
        fetch("/user/logout", { method: "POST" }).then(() => location.reload());
      }
    }
    else alert("Cảm ơn bạn đã ở lại với chúng mình. Nếu chúng mình có bất cứ điều gì làm cho bạn không hài lòng, hãy gửi ở Báo cáo nhé!");
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
            <FormTextBox type="password" placeholder="Mật khẩu" icon="bi-lock-fill" value={password} onValueChange={handlePassword} errorValue={errorPassword} disabled={disablePassword} />
          </div>

          <div className="avatar-container">
            <img src={avatar} alt="avatar" className="w-120px avatar" id="avatar" />
            <input type="file" id="upload-thumbnail" accept="image/*" className="disabled" onChange={handleFileUpload} />
            <input type="button" value="Chọn avatar" onClick={() => document.getElementById('upload-thumbnail').click()} className="small-at-btn mt-2" />
          </div>
        </div>

        <div className="text-center">
          <a href="/nguoi-dung/doi-mat-khau" className="me-2">
            <input type="button" value="Thay đổi mật khẩu" className="small-at-btn-secondary m-at-btn" />
          </a>

          <a href="/nguoi-dung/dia-chi" className="me-2">
            <input type="button" value="Danh sách địa chỉ" className="small-at-btn-secondary m-at-btn" />
          </a>

          <a className="me-2" onClick={e => lockAccount(e)}>
            <input type="button" value="Khóa tài khoản" className="small-at-btn-secondary m-at-btn" />
          </a>

          <a href="/nguoi-dung/lich-su-don-hang">
            <input type="button" value="Lịch sử đơn hàng" className="small-at-btn-secondary m-at-btn" />
          </a>
        </div>

        <input type="submit" value="Lưu thông tin" onClick={e => updateInfo(e)} className="at-btn m-at-btn" />
      </form>
    </main>
  );
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
    fetch(`/user/get/detail`).then(response => response.json()).then(data => {
      this.setState({ loading: false, user: data })
    }).catch(() => this.setState({ loading: false }));
  }

  handleFullNameChange = newFullName => this.setState({ fullName: newFullName });
  handlePhoneChange = newPhone => this.setState({ phone: newPhone });
  handleEmailChange = newEmail => this.setState({ email: newEmail });

  render() {
    return this.state.loading ? <PleaseWait /> : <UserDetailPartial user={this.state.user} />
  }
}
import "./Login.css"
import FormTextBox from "/src/Components/shared/FormTextBox"
import { useState, useEffect } from 'react'
import { auth } from "/firebase";
import { updatePassword } from "firebase/auth";

export default function RedirectRegister() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [fullName, setFullName] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [phone, setPhone] = useState("");
  let [address, setAddress] = useState("");
  let [errorUsername, setErrorUsername] = useState("");
  let [errorPassword, setErrorPassword] = useState("");
  let [errorFullName, setErrorFullName] = useState("");
  let [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  let [errorPhone, setErrorPhone] = useState("");
  let [errorAddress, setErrorAddress] = useState("");

  useEffect(() => {
    fetch('/user/login/tempToken').then(response => {if (!response.ok) throw new Exception("No token")})
      .catch(() => fetch('/user/login/cleartemp', {method: 'DELETE'}).finally(() => location.href = "/"))
  }, [])

  const handleUsername = e => {
    setUsername(username = e.target.value);
    handleErrorUsername();
  }

  const handleErrorUsername = () => {
    let error = "";

    if (username === "") error = "Vui lòng nhập tên đăng nhập";
    else if (!username.match(/^[a-zA-Z]\w{5,}$/gm)) error = "Tên đăng nhập phải từ 6 kí tự trở lên, bắt đầu bằng chữ, và chỉ được chứa chữ hoặc số";

    setErrorUsername(errorUsername = error);
  }

  const handlePassword = e => {
    setPassword(password = e.target.value);
    handleErrorPassword();
  }

  const handleErrorPassword = () => {
    let pError = "", cError = "";

    if (password === "") pError = "Mật khẩu không được để trống";
    else if (!password.match(/^.{6,}$/gm)) pError = "Mật khẩu phải từ 6 kí tự trở lên";
    else if (confirmPassword !== password) cError = "Xác nhận mật khẩu phải trùng khớp với mật khẩu";

    setErrorPassword(errorPassword = pError);
    setErrorConfirmPassword(errorConfirmPassword = cError);
  }

  const handleFullName = e => {
    setFullName(fullName = e.target.value);
    handleErrorFullName();
  }

  const handleErrorFullName = () => {
    let error = "";
    if (fullName === "") error = "Họ tên không được để trống";
    setErrorFullName(errorFullName = error);
  }

  const handleConfirmPassword = e => {
    setConfirmPassword(confirmPassword = e.target.value);
    handleErrorConfirmPassword();
  }

  const handleErrorConfirmPassword = () => {
    let error = "";

    if (confirmPassword === "") error = "Xác nhận mật khẩu không được để trống";
    else if (confirmPassword !== password) error = "Xác nhận mật khẩu phải trùng khớp với mật khẩu";
    setErrorConfirmPassword(errorConfirmPassword = error);
  }

  const handlePhone = e => {
    setPhone(phone = e.target.value);
    handleErrorPhone();
  }

  const handleErrorPhone = () => {
    let error = "";

    if (phone === "") error = "Số điện thoại không được để trống";
    else if (!phone.match(/^0(([3,5,7,8,9][0-9]{8})|([2][0-9]{9}))$/gm)) error = "Số điện thoại phải đúng định dạng (10 hoặc 11 số)";
    setErrorPhone(errorPhone = error);
  }

  const handleAddress = e => {
    setAddress(address = e.target.value);
    handleErrorAddress();
  }

  const handleErrorAddress = () => {
    let error = "";

    if (address === "") error = "Cần có địa chỉ mặc định";
    else if (!address.match(/^\d+(\/\d)*.+$/gm)) address = "Vui lòng nhập địa chỉ đúng định dạng (VD: 23 Âu Dương Lân, P3, Q8)";
    setErrorAddress(errorAddress = error);
  }

  async function RegisterUser(e) {
    e.preventDefault();

    handleErrorUsername();
    handleErrorPassword();
    handleErrorConfirmPassword();
    handleErrorPhone();
    handleErrorAddress();

    if (!(errorUsername === "" && errorPassword === "" && errorConfirmPassword === "" && errorPhone === "" && errorAddress === "")) return;
    
    if (confirm("Bạn đã hoàn tất điền thông tin tài khoản chưa?")) {
      const user = auth.currentUser;
      try {
        await updatePassword(user, password);
        const response = await fetch("/user/register/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({firebaseUid: user.uid, fullName, username, phone, email: user.email, address})
        })

        if (response.ok) {
          fetch('/user/login/cleartemp', {method: 'DELETE'}).then(() => {
            alert("Đăng nhập thành công!");
            location.href = "/"
          })
        }
        else alert("Đã có lỗi xảy ra, đăng ký tài khoản thất bại.");
      }
      catch (err) {
        console.error(err);
        alert("Đã có lỗi xảy ra, đăng ký tài khoản thất bại.");
      }
    }
  }

  return (
    <main className="login-main">
      <h1 className="fw-bold text-uppercase">Đăng ký</h1>
      <hr />

      <p className="fs-5"><b><i>Lưu ý: Nếu bạn rời khỏi trang, đăng ký sẽ thất bại!</i></b></p>

      <form className="login-form">
        <FormTextBox type="usernameSU" placeholder="Username" icon="bi-person-fill" value={username} onValueChange={handleUsername} errorValue={errorUsername} />
        <FormTextBox type="passwordSU" placeholder="Mật khẩu" icon="bi-lock-fill" value={password} onValueChange={handlePassword} errorValue={errorPassword} />
        <FormTextBox type="confirmpasswordSU" placeholder="Xác nhận mật khẩu" icon="bi-lock-fill" value={confirmPassword} onValueChange={handleConfirmPassword} errorValue={errorConfirmPassword} />
        <FormTextBox type="fullNameSU" placeholder="Họ tên người dùng" icon="bi-person-fill" value={fullName} onValueChange={handleFullName} errorValue={errorFullName} />
        <FormTextBox type="phoneSU" placeholder="Số điện thoại" icon="bi-telephone-fill" value={phone} onValueChange={handlePhone} errorValue={errorPhone} />
        <FormTextBox type="addressSU" placeholder="Địa chỉ nhà" icon="bi-house-door-fill" value={address} onValueChange={handleAddress} errorValue={errorAddress} />
        
        <input type="submit" className="at-btn m-at-btn" value="Đăng ký" onClick={e => RegisterUser(e)} />
      </form>
    </main>
  )
}
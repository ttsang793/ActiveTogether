import "./Login.css"
import FormTextBox from "/src/Components/shared/FormTextBox"
import { useState } from 'react'
import { Encode } from "/src/Scripts/Utility";
import { auth } from "/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

function showLoginForm(e) {
  e.preventDefault();
  document.title = document.getElementById("title").innerHTML = "Đăng nhập";
  document.title += " tài khoản";
  document.getElementById("sign-up-form").classList.add("disabled");
  document.getElementById("login-form").classList.remove("disabled");
}

export default function Register() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [fullName, setFullName] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [phone, setPhone] = useState("");
  let [email, setEmail] = useState("");
  let [address, setAddress] = useState("");
  let [errorUsername, setErrorUsername] = useState("");
  let [errorPassword, setErrorPassword] = useState("");
  let [errorFullName, setErrorFullName] = useState("");
  let [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  let [errorPhone, setErrorPhone] = useState("");
  let [errorEmail, setErrorEmail] = useState("");
  let [errorAddress, setErrorAddress] = useState("");

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

  const handleEmail = e => {
    setEmail(email = e.target.value);
    handleErrorEmail();
  }

  const handleErrorEmail = () => {
    let error = "";

    if (email === "") error = "Email không được để trống";
    else if (!email.match(/.+@[a-z]+(\.[a-z]*)+/gm)) error = "Email phải đúng định dạng (example@mail.com)";
    setErrorEmail(errorEmail = error);
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
    handleErrorEmail();
    handleErrorAddress();

    if (!(errorUsername === "" && errorPassword === "" && errorConfirmPassword === "" && errorPhone === "" && errorEmail === "" && errorAddress === "")) return;
    
    if (confirm("Bạn có muốn đăng ký tài khoản?")) {
      password = Encode(username, password);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const response = await fetch("/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({firebaseUid: userCredential.user.uid, fullName, username, password, phone, email, address})
      })

      if (response.ok) {
        alert("Tài khoản đã được đăng ký. Vui lòng đăng nhập");
        await sendEmailVerification(userCredential.user);
        location.reload();
      }
      else alert("Đã có lỗi xảy ra, đăng ký tài khoản thất bại.");
    }
  }

  return (
    <form className="login-form disabled" id="sign-up-form">
      <FormTextBox type="usernameSU" placeholder="Username" icon="bi-person-fill" value={username} onValueChange={handleUsername} errorValue={errorUsername} />
      <FormTextBox type="passwordSU" placeholder="Mật khẩu" icon="bi-lock-fill" value={password} onValueChange={handlePassword} errorValue={errorPassword} />
      <FormTextBox type="confirmpasswordSU" placeholder="Xác nhận mật khẩu" icon="bi-lock-fill" value={confirmPassword} onValueChange={handleConfirmPassword} errorValue={errorConfirmPassword} />
      <FormTextBox type="fullNameSU" placeholder="Họ tên người dùng" icon="bi-person-fill" value={fullName} onValueChange={handleFullName} errorValue={errorFullName} />
      <FormTextBox type="phoneSU" placeholder="Số điện thoại" icon="bi-telephone-fill" value={phone} onValueChange={handlePhone} errorValue={errorPhone} />
      <FormTextBox type="emailSU" placeholder="Địa chỉ email" icon="bi-envelope-at-fill" value={email} onValueChange={handleEmail} errorValue={errorEmail} />
      <FormTextBox type="addressSU" placeholder="Địa chỉ nhà" icon="bi-house-door-fill" value={address} onValueChange={handleAddress} errorValue={errorAddress} />
      
      <input type="submit" className="at-btn m-at-btn" value="Đăng ký" onClick={e => RegisterUser(e)} />
      <div className="switch-question">Bạn đã có tài khoản? <a className="switch-page" onClick={e => showLoginForm(e)}>Đăng nhập ngay!</a></div>
    </form>
  )
}
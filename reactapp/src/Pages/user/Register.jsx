import "./Login.css"
import FormTextBox from "/src/Components/shared/FormTextBox"
import { useState } from 'react'
import { Encode } from "/src/Scripts/Utility";

function showLoginForm(e) {
  e.preventDefault();
  document.title = document.getElementById("title").innerHTML = "Đăng nhập";
  document.title += " tài khoản";
  document.getElementById("sign-up-form").classList.add("disabled");
  document.getElementById("login-form").classList.remove("disabled");
}

export default function Register() {
  let [usernameSU, setUsernameSU] = useState("");
  let [passwordSU, setPasswordSU] = useState("");
  let [ConfirmPasswordSU, setConfirmPasswordSU] = useState("");
  let [phoneSU, setPhoneSU] = useState("");
  let [emailSU, setEmailSU] = useState("");
  let [addressSU, setAddressSU] = useState("");
  let [errorUsernameSU, setErrorUsernameSU] = useState("");
  let [errorPasswordSU, setErrorPasswordSU] = useState("");
  let [errorConfirmPasswordSU, setErrorConfirmPasswordSU] = useState("");
  let [errorPhoneSU, setErrorPhoneSU] = useState("");
  let [errorEmailSU, setErrorEmailSU] = useState("");
  let [errorAddressSU, setErrorAddressSU] = useState("");

  const handleUsernameSUChange = (newUsernameSU) => setUsernameSU(usernameSU = newUsernameSU);
  const handlePasswordSUChange = (newPasswordSU) => setPasswordSU(passwordSU = newPasswordSU);
  const handleConfirmPasswordSUChange = (newConfirmPasswordSU) => setConfirmPasswordSU(ConfirmPasswordSU = newConfirmPasswordSU);
  const handlePhoneSUChange = (newPhoneSU) => setPhoneSU(phoneSU = newPhoneSU);
  const handleEmailSUChange = (newEmailSU) => setEmailSU(emailSU = newEmailSU);
  const handleAddressSUChange = (newAddressSU) => setAddressSU(addressSU = newAddressSU);
  const handleUsernameSUError = (newErrorUsernameSU) => setErrorUsernameSU(errorUsernameSU = newErrorUsernameSU);
  const handlePasswordSUError = (newErrorPasswordSU) => setErrorPasswordSU(errorPasswordSU = newErrorPasswordSU);
  const handleConfirmPasswordSUError = (newErrorConfirmPasswordSU) => setErrorConfirmPasswordSU(errorConfirmPasswordSU = newErrorConfirmPasswordSU);
  const handlePhoneSUError = (newErrorPhoneSU) => setErrorPhoneSU(errorPhoneSU = newErrorPhoneSU);
  const handleEmailSUError = (newErrorEmailSU) => setErrorEmailSU(errorEmailSU = newErrorEmailSU);
  const handleAddressSUError = (newErrorAddressSU) => setErrorAddressSU(errorAddressSU = newErrorAddressSU);

  async function RegisterUser(e) {
    e.preventDefault();

    const error = [];
    let errorFlag = false;
    if (usernameSU === "") {
      error.push("Vui lòng nhập tên đăng nhập.");
      errorFlag = true;
    }
    else if (!usernameSU.match(/^\w{6,}$/gm)) {
      error.push("Tên đăng nhập phải từ 6 kí tự trở lên, và chỉ được chứa chữ hoặc số.");
      errorFlag = true;
    }
    else error.push("");
    if (passwordSU === "") {
      error.push("Mật khẩu không được để trống");
      errorFlag = true;
    }
    else error.push("");
    if (ConfirmPasswordSU === "") {
      error.push("Xác nhận mật khẩu không được để trống");
      errorFlag = true;
    }
    else if (ConfirmPasswordSU !== passwordSU) {
      error.push("Xác nhận mật khẩu phải trùng khớp với mật khẩu");
      errorFlag = true;
    }
    else error.push("");
    if (phoneSU === "") {
      error.push("Số điện thoại không được để trống");
      errorFlag = true;
    }
    else if (!phoneSU.match(/^0(([3,5,7,8,9][0-9]{8})|([2][0-9]{9}))$/gm)) {
      error.push("Số điện thoại phải đúng định dạng (10 hoặc 11 số)");
      errorFlag = true;
    }
    else error.push("");
    if (emailSU === "") {
      error.push("Email không được để trống");
      errorFlag = true;
    }
    else if (!emailSU.match(/.+@[a-z]+(\.[a-z]*)+/gm)) {
      error.push("Email phải đúng định dạng (example@mail.com)");
      errorFlag = true;
    }
    else error.push("");
    if (addressSU === "") {
      error.push("Cần có địa chỉ mặc định");
      errorFlag = true;
    }
    else error.push("");
    

    if (errorFlag) {
      handleUsernameSUError(error[0])
      handlePasswordSUError(error[1])
      handleConfirmPasswordSUError(error[2])
      handlePhoneSUError(error[3])
      handleEmailSUError(error[4])
      handleAddressSUError(error[5])
      return;
    }
    
    if (confirm("Bạn có muốn đăng ký tài khoản?")) {
      let password = Encode(usernameSU, passwordSU);
      const response = await fetch("/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({username: usernameSU, password, phone: phoneSU, email: emailSU, address: addressSU})
      })

      if (response.ok) { alert("Tài khoản đã được đăng ký. Vui lòng đăng nhập"); location.reload() }
      else alert("Đã có lỗi xảy ra, đăng ký tài khoản thất bại.");
    }
  }

  return (
    <form className="login-form disabled" id="sign-up-form">
      <FormTextBox type="usernameSU" placeholder="Tên người dùng" icon="bi-person-fill" value={usernameSU} onValueChange={handleUsernameSUChange} errorValue={errorUsernameSU} />
      <FormTextBox type="passwordSU" placeholder="Mật khẩu" icon="bi-lock-fill" onValueChange={handlePasswordSUChange} errorValue={errorPasswordSU} />
      <FormTextBox type="confirmpasswordSU" placeholder="Xác nhận mật khẩu" icon="bi-lock-fill" onValueChange={handleConfirmPasswordSUChange} errorValue={errorConfirmPasswordSU} />
      <FormTextBox type="phoneSU" placeholder="Số điện thoại" icon="bi-telephone-fill" value={phoneSU} onValueChange={handlePhoneSUChange} errorValue={errorPhoneSU} />
      <FormTextBox type="emailSU" placeholder="Địa chỉ email" icon="bi-envelope-at-fill" value={emailSU} onValueChange={handleEmailSUChange} errorValue={errorEmailSU} />
      <FormTextBox type="addressSU" placeholder="Địa chỉ nhà" icon="bi-house-door-fill" value={addressSU} onValueChange={handleAddressSUChange} errorValue={errorAddressSU} />
      
      <input type="submit" className="at-btn m-at-btn" value="Đăng ký" onClick={e => RegisterUser(e)} />
      <div className="switch-question">Bạn đã có tài khoản? <a className="switch-page" onClick={e => showLoginForm(e)}>Đăng nhập ngay!</a></div>
    </form>
  )
}
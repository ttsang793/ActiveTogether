import "./Login.css"
import FormTextBox from "/src/Components/FormTextBox"
import { useState } from 'react'
import { Encode } from "/src/Components/Utility";

function showSignupForm(e) {
  e.preventDefault();
  document.title = document.getElementById("title").innerHTML = "Đăng ký";
  document.title += " tài khoản";
  document.getElementById("login-form").classList.add("disabled");
  document.getElementById("sign-up-form").classList.remove("disabled");
}

function showLoginForm(e) {
  e.preventDefault();
  document.title = document.getElementById("title").innerHTML = "Đăng nhập";
  document.title += " tài khoản";
  document.getElementById("sign-up-form").classList.add("disabled");
  document.getElementById("login-form").classList.remove("disabled");
}

async function login(e, username, password) {
  e.preventDefault();
  password = Encode(username, password);
  console.log(password);
  const response = await fetch("/user/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({username, password})
  });
  
  if (response.ok) {
    alert("Đăng nhập thành công");
    localStorage.setItem("userLogin", username);
    location.href = "/";
  }
  else alert("Sai mật khẩu, đăng nhập thất bại");
}

async function register(username, password, phone, email, address) {
  if (confirm("Bạn có muốn đăng ký tài khoản?")) {
    password = Encode(username, password);
    const response = await fetch("/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({username, password, phone, email, address})
    })

    if (response.ok) { alert("Tài khoản đã được đăng ký. Vui lòng đăng nhập"); location.reload() }
    else alert("Đã có lỗi xảy ra, đăng ký tài khoản thất bại.");
  }
}

export default function Login() {
  let [usernameLG, setUsernameLG] = useState("");
  let [passwordLG, setPasswordLG] = useState("");
  let [usernameSU, setUsernameSU] = useState("");
  let [passwordSU, setPasswordSU] = useState("");
  let [confirmpasswordSU, setConfirmpasswordSU] = useState("");
  let [phoneSU, setPhoneSU] = useState("");
  let [emailSU, setEmailSU] = useState("");
  let [addressSU, setAddressSU] = useState("");

  const handleUsernameLGChange = (newUsernameLG) => setUsernameLG(usernameLG = newUsernameLG);
  const handlePasswordLGChange = (newPasswordLG) => setPasswordLG(passwordLG = newPasswordLG);
  const handleUsernameSUChange = (newUsernameSU) => setUsernameSU(usernameSU = newUsernameSU);
  const handlePasswordSUChange = (newPasswordSU) => setPasswordSU(passwordSU = newPasswordSU);
  const handleConfirmpasswordSUChange = (newConfirmpasswordSU) => setConfirmpasswordSU(confirmpasswordSU = newConfirmpasswordSU);
  const handlePhoneSUChange = (newPhoneSU) => setPhoneSU(phoneSU = newPhoneSU);
  const handleEmailSUChange = (newEmailSU) => setEmailSU(emailSU = newEmailSU);
  const handleAddressSUChange = (newAddressSU) => setAddressSU(addressSU = newAddressSU);

  return (    
    <main>
      <h1 className="flex-grow-1 text-center fw-bold text-uppercase" id="title">Đăng nhập</h1>
      <hr />

      <form className="login-form" id="login-form">
        <FormTextBox type="usernameLG" placeholder="Tên người dùng" icon="bi-person-fill" value={usernameLG} onValueChange={handleUsernameLGChange} />
        <FormTextBox type="passwordLG" placeholder="Mật khẩu" icon="bi-lock-fill" onValueChange={handlePasswordLGChange} />
        <div className="d-flex w-100 justify-content-between">
          <div className="mt-2">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">&nbsp;Ghi nhớ tài khoản</label>
          </div>
          <a className="switch-page" href="">Quên mật khẩu?</a>
        </div>
        
        <input type="submit" className="at-btn m-at-btn" value="Đăng nhập" onClick={e => login(e, usernameLG, passwordLG)} />
        <div className="switch-question">Bạn chưa có tài khoản? <a className="switch-page" onClick={e => showSignupForm(e)}>Đăng ký ngay!</a></div>
      </form>

      <form className="login-form disabled" id="sign-up-form">
        <FormTextBox type="usernameSU" placeholder="Tên người dùng" icon="bi-person-fill" value={usernameSU} onValueChange={handleUsernameSUChange} />
        <FormTextBox type="passwordSU" placeholder="Mật khẩu" icon="bi-lock-fill" onValueChange={handlePasswordSUChange} />
        <FormTextBox type="confirmpasswordSU" placeholder="Xác nhận mật khẩu" icon="bi-lock-fill" onValueChange={handleConfirmpasswordSUChange} />
        <FormTextBox type="phoneSU" placeholder="Số điện thoại" icon="bi-telephone-fill" value={phoneSU} onValueChange={handlePhoneSUChange} />
        <FormTextBox type="emailSU" placeholder="Địa chỉ email" icon="bi-envelope-at-fill" value={emailSU} onValueChange={handleEmailSUChange} />
        <FormTextBox type="addressSU" placeholder="Địa chỉ nhà" icon="bi-house-door-fill" value={addressSU} onValueChange={handleAddressSUChange} />
        
        <input type="submit" className="at-btn m-at-btn" value="Đăng ký" onClick={() => register(usernameSU, passwordSU, phoneSU, emailSU, addressSU)} />
        <div className="switch-question">Bạn đã có tài khoản? <a className="switch-page" onClick={e => showLoginForm(e)}>Đăng nhập ngay!</a></div>
      </form>
    </main>
  )
}
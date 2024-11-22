import "./Login.css"
import FormTextBox from "/src/Components/shared/FormTextBox"
import { useState } from 'react'
import { Encode } from "/src/Scripts/Utility";
import Register from "/src/Pages/user/Register";

function showSignupForm(e) {
  e.preventDefault();
  document.title = document.getElementById("title").innerHTML = "Đăng ký";
  document.title += " tài khoản";
  document.getElementById("login-form").classList.add("disabled");
  document.getElementById("sign-up-form").classList.remove("disabled");
}

export default function Login() {
  let [usernameLG, setUsernameLG] = useState("");
  let [passwordLG, setPasswordLG] = useState("");
  let [errorUsernameLG, setErrorUsernameLG] = useState("");
  let [errorPasswordLG, setErrorPasswordLG] = useState("");

  const handleUsernameLGChange = (newUsernameLG) => setUsernameLG(usernameLG = newUsernameLG);
  const handlePasswordLGChange = (newPasswordLG) => setPasswordLG(passwordLG = newPasswordLG);
  const handleUsernameLGError = (newErrorUsernameLG) => setErrorUsernameLG(errorUsernameLG = newErrorUsernameLG);
  const handlePasswordLGError = (newErrorPasswordLG) => setErrorPasswordLG(errorPasswordLG = newErrorPasswordLG);
  

  async function LoginUser(e) {
    e.preventDefault();
    const error = [];
    let errorFlag = false;
    if (usernameLG === "") {
      error.push("Vui lòng nhập tên đăng nhập, email hoặc SĐT.");
      errorFlag = true;
    }
    else error.push("");
    if (passwordLG === "") {
      error.push("Vui lòng nhập mật khẩu.");
      errorFlag = true;
    }
    else error.push("");

    if (errorFlag) {
      handleUsernameLGError(error[0]);
      handlePasswordLGError(error[1]);
      return;
    }

    const password = Encode(usernameLG, passwordLG);
    const response = await fetch("/user/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({username: usernameLG, password})
    });
    console.log({username: usernameLG, password})
    
    if (response.ok) {
      alert("Đăng nhập thành công");
      localStorage.setItem("userLogin", usernameLG);
      location.href = "/";
    }
    else if (response.status === 404) handleUsernameLGError("Tài khoản không tồn tại. Vui lòng kiểm tra lại.");
    else if (response.status === 500) handlePasswordLGError("Sai mật khẩu, vui lòng nhập lại.");
  }

  return (    
    <main className="login-main">
      <h1 className="fw-bold text-uppercase" id="title">Đăng nhập</h1>
      <hr />

      <form className="login-form" id="login-form">
        <FormTextBox type="usernameLG" placeholder="Tên người dùng" icon="bi-person-fill" value={usernameLG} onValueChange={handleUsernameLGChange} errorValue={errorUsernameLG} />
        <FormTextBox type="passwordLG" placeholder="Mật khẩu" icon="bi-lock-fill" onValueChange={handlePasswordLGChange} errorValue={errorPasswordLG} />
        <div className="text-start">
          <a className="switch-page" href="">Quên mật khẩu?</a>
        </div>
        
        <input type="submit" className="at-btn m-at-btn" value="Đăng nhập" onClick={e => LoginUser(e)} />
        <div className="switch-question">Bạn chưa có tài khoản? <a className="switch-page" onClick={e => showSignupForm(e)}>Đăng ký ngay!</a></div>
      </form>

      <Register />
    </main>
  )
}
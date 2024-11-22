import FormTextBox from "/src/Components/shared/FormTextBox"
import { useState } from 'react'
import { Encode } from "/src/Scripts/Utility";
import "./Login.css"

export default function ALogin() {  
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [errorUsername, setErrorUsername] = useState("");
  let [errorPassword, setErrorPassword] = useState("");

  const handleUsernameChange = (newUsername) => setUsername(username = newUsername);
  const handlePasswordChange = (newPassword) => setPassword(password = newPassword);
  const handleUsernameError = (newErrorUsername) => setErrorUsername(errorUsername = newErrorUsername);
  const handlePasswordError = (newErrorPassword) => setErrorPassword(errorPassword = newErrorPassword);

  async function LoginUser(e) {
    e.preventDefault();
    const error = [];
    let errorFlag = false;
    if (username === "") {
      error.push("Vui lòng nhập mã nhân viên");
      errorFlag = true;
    }
    else error.push("");
    if (password === "") {
      error.push("Vui lòng nhập mật khẩu.");
      errorFlag = true;
    }
    else error.push("");
  
    if (errorFlag) {
      handleUsernameError(error[0]);
      handlePasswordError(error[1]);
      return;
    }
  
    let passwordLG = Encode(username, password);
    console.log(passwordLG);
    /*
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
    else alert("Sai mật khẩu, đăng nhập thất bại");*/
  }

  return (
    <main className="admin-login-main">
      <h1 className="text-center fw-bold text-uppercase" id="title">Chào mừng bạn quay trở lại!</h1>
      <h4 className="text-center fst-italic">Mời bạn đăng nhập.</h4>
      <hr />

      <form className="login-form" id="login-form">
        <FormTextBox type="username" placeholder="Mã nhân viên" icon="bi-person-fill" value={username} onValueChange={handleUsernameChange} errorValue={errorUsername} />
        <FormTextBox type="password" placeholder="Mật khẩu" icon="bi-lock-fill" onValueChange={handlePasswordChange} errorValue={errorPassword} />
        
        <input type="submit" className="at-btn m-at-btn" value="Đăng nhập" onClick={e => LoginUser(e)} />
      </form>
    </main>
  )
}
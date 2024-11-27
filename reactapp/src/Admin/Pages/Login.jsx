import FormTextBox from "/src/Components/shared/FormTextBox"
import { useState } from 'react'
import { Encode2 } from "/src/Scripts/Utility";
import "./Login.css"

export default function ALogin() {  
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [errorUsername, setErrorUsername] = useState("");
  let [errorPassword, setErrorPassword] = useState("");

  const handleUsernameChange = e => {
    setUsername(username = e.target.value);
    handleUsernameError();
  }

  const handlePasswordChange = e => {
    setPassword(password = e.target.value);
    handlePasswordError();
  }

  const handleUsernameError = () => {
    let error = "";
    if (username === "" || isNaN(Number(username))) error = "Vui lòng nhập mã nhân viên"
    setErrorUsername(errorUsername = error);
  }

  const handlePasswordError = () => {
    let error = "";
    if (password === "") error = "Vui lòng nhập mật khẩu"
    setErrorPassword(errorPassword = error);
  }

  async function LoginUser(e) {
    e.preventDefault();

    handleUsernameError();
    handlePasswordError();
  
    if (errorUsername !== "" || errorPassword !== "") return;
  
    password = Encode2(username, password);
    
    const response = await fetch("/api/adminuser/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({username, password})
    });
    
    if (response.ok) {
      alert("Đăng nhập thành công");
      location.href = "/admin/home";
    }
    else if (response.status === 404) setErrorUsername("Tài khoản không tồn tại. Vui lòng kiểm tra lại.");
    else if (response.status === 500) setErrorPassword("Sai mật khẩu, vui lòng nhập lại.");
  }

  return (
    <main className="admin-login-main">
      <h1 className="text-center fw-bold text-uppercase" id="title">Chào mừng bạn quay trở lại!</h1>
      <h4 className="text-center fst-italic">Mời bạn đăng nhập.</h4>
      <hr />

      <form className="login-form" id="login-form">
        <FormTextBox type="username" placeholder="Mã nhân viên" icon="bi-person-fill" value={username} onValueChange={handleUsernameChange} errorValue={errorUsername} />
        <FormTextBox type="password" placeholder="Mật khẩu" icon="bi-lock-fill" value={password} onValueChange={handlePasswordChange} errorValue={errorPassword} />
        
        <input type="submit" className="at-btn m-at-btn" value="Đăng nhập" onClick={e => LoginUser(e)} />
      </form>
    </main>
  )
}
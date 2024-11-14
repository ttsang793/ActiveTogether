import FormTextBox from "/src/Components/FormTextBox"
import { useState } from 'react'
import { Encode } from "/src/Components/Utility";
import "./Login.css"

export default function ALogin() {
  let [usernameLG, setUsernameLG] = useState("");
  let [passwordLG, setPasswordLG] = useState("");
  
  const handleUsernameLGChange = (newUsernameLG) => setUsernameLG(usernameLG = newUsernameLG);
  const handlePasswordLGChange = (newPasswordLG) => setPasswordLG(passwordLG = newPasswordLG);
  return (
    <main className="admin-login-main">
      <h2 className="flex-grow-1 text-center fw-bold text-uppercase" id="title">Chào mừng bạn quay trở lại!</h2>
      <h4 className="text-center fw-bold">Mời bạn đăng nhập</h4>
      <hr />

      <form className="login-form" id="login-form">
        <FormTextBox type="usernameLG" placeholder="Tên người dùng" icon="bi-person-fill" value={usernameLG} onValueChange={handleUsernameLGChange} />
        <FormTextBox type="passwordLG" placeholder="Mật khẩu" icon="bi-lock-fill" onValueChange={handlePasswordLGChange} />
        
        <input type="submit" className="at-btn m-at-btn" value="Đăng nhập" onClick={e => login(e, usernameLG, passwordLG)} />
      </form>
    </main>
  )
}

async function login(e, username, password) {
  e.preventDefault();
  password = Encode(username, password);
  console.log(password);
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
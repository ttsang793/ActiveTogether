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
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [errorUsername, setErrorUsername] = useState("");
  let [errorPassword, setErrorPassword] = useState("");

  const handleUsername = e => {
    setUsername(username = e.target.value);
    handleErrorUsername();
  }

  const handleErrorUsername = () => {
    let error = "";
    if (username === "") error = "Vui lòng nhập tên đăng nhập, email hoặc SĐT";
    setErrorUsername(error);
  }

  const handlePassword = e => {
    setPassword(password = e.target.value);
    handleErrorPassword();
  }

  const handleErrorPassword = () => {
    let error = "";
    if (password === "") error = "Vui lòng nhập mật khẩu";
    setErrorPassword(error);
  }
  

  async function LoginUser(e) {
    e.preventDefault();

    handleErrorUsername();
    handleErrorPassword();

    if (errorUsername !== "" || errorPassword !== "") return;

    password = Encode(username, password);
    const response = await fetch("/user/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({username: username, password})
    });
    
    if (response.ok) {
      alert("Đăng nhập thành công");

      fetch(`/user/avatar/get?username=${username}`).then(response => response.text()).then(data => {
        console.log(data);
        localStorage.setItem("userLogin", username);
        localStorage.setItem("userAvatar", data);
        location.href = "/";
      })
    }
    else if (response.status === 404) setErrorUsername("Tài khoản không tồn tại. Vui lòng kiểm tra lại.");
    else if (response.status === 500) setErrorPassword("Sai mật khẩu, vui lòng nhập lại.");
  }

  return (    
    <main className="login-main">
      <h1 className="fw-bold text-uppercase" id="title">Đăng nhập</h1>
      <hr />

      <form className="login-form" id="login-form">
        <FormTextBox type="username" placeholder="Tên người dùng" icon="bi-person-fill" value={username} onValueChange={handleUsername} errorValue={errorUsername} />
        <FormTextBox type="password" placeholder="Mật khẩu" icon="bi-lock-fill" value={password} onValueChange={handlePassword} errorValue={errorPassword} />
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
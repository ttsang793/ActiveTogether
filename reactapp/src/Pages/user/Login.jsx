import "./Login.css"
import FormTextBox from "/src/Components/shared/FormTextBox"
import { useState } from 'react'
import Register from "/src/Pages/user/Register";
import { auth, provider } from "/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

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
    if (username === "") error = "Vui lòng nhập tên đăng nhập hoặc email đã đăng ký";
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

    let email = username;
    if (!email.match(/.+@[a-z]+(\.[a-z]*)+/gm)) {
      try {
        const response = await fetch(`/user/get/email?username=${username}`);
        email = await response.text();

        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const idToken = await userCredential.user.getIdToken();
    
          fetch(`/user/login?token=${idToken}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }).then(() => { alert("Đăng nhập thành công!"); location.href = "/" })
        }
        catch (err) {
          if (err.message.includes("auth/user-disabled")) setErrorUsername("Tài khoản đã bị khóa. Vui lòng kiểm tra lại.");
          else if (err.message.includes("auth/invalid-credential")) setErrorPassword("Sai mật khẩu, vui lòng nhập lại.");
        }
      }
      catch {
        setErrorUsername("Tài khoản không tồn tại. Vui lòng kiểm tra lại.");        
      }
    }    
  }

  async function GoogleLogin() {
    auth.languageCode = 'vi';
    provider.setCustomParameters({ 'hl': 'vi' });

    signInWithPopup(auth, provider).then(result => {
      const idToken = result._tokenResponse.idToken;
      fetch(`/user/login?token=${idToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(() => { alert("Đăng nhập thành công!"); location.href = "/" })
    }).catch(err => console.log(err.message));
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
        <div className="switch-question mt-3">
          Hoặc có thể đăng nhập bằng:
          <abbr title="Google" className="pointer">
            <img src="google.webp" alt="Google" onClick={GoogleLogin} className="redirect-icon mx-2" />
          </abbr>
        </div>
        <div className="switch-question">Bạn chưa có tài khoản? <a className="switch-page" onClick={e => showSignupForm(e)}>Đăng ký ngay!</a></div>
      </form>

      <Register />
    </main>
  )
}
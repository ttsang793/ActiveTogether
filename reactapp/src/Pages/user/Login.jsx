import "./Login.css"
import FormTextBox from "/src/Components/shared/FormTextBox"
import { useState } from 'react'
import Register from "/src/Pages/user/Register";
import ForgetPassword from "/src/Pages/user/ForgetPassword";
import Cookies from "js-cookie";
import { auth, provider } from "/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

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

  function showSignupForm(e) {
    e.preventDefault();
    document.title = document.getElementById("title").innerHTML = "Đăng ký";
    document.title += " tài khoản";
    document.getElementById("login-form").classList.add("disabled");
    document.getElementById("sign-up-form").classList.remove("disabled");
  }

  function showForgetForm(e) {
    e.preventDefault();
    document.title = document.getElementById("title").innerHTML = "Khôi phục";
    document.title += " tài khoản";
    document.getElementById("login-form").classList.add("disabled");
    document.getElementById("forget-form").classList.remove("disabled");
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
      }
      catch {
        setErrorUsername("Tài khoản không tồn tại. Vui lòng kiểm tra lại.");        
      }
    }
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();

      fetch(`/user/login?token=${idToken}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(() => {
        Cookies.set("user_token", idToken, { secure: true, sameSite: "Lax" });
        alert("Đăng nhập thành công!"); location.href = "/"
      })
    }
    catch (err) {
      if (err.message.includes("auth/invalid-credential")) setErrorPassword("Sai mật khẩu, vui lòng nhập lại.");
    }
  }

  async function GoogleLogin(e) {
    e.preventDefault();
    auth.languageCode = 'vi';
    provider.setCustomParameters({ 'hl': 'vi' });

    try {
      const credential = await signInWithPopup(auth, provider);
      const idToken = credential._tokenResponse.idToken;
      const availableResponse = await fetch(`/user/login/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ tempToken: idToken, email: credential.user.email })
      });
      if (availableResponse.status == 200) {
        Cookies.set("user_token", idToken, { secure: true, sameSite: "Lax" });
        fetch(`/user/login?token=${idToken}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }).then(() => { alert("Đăng nhập thành công!"); location.href = "/" })
      }
      else {
        alert("Vui lòng đăng ký tài khoản để hoàn thành đăng nhập!");
        location.href = `/lan-dau-google/`
      }
    }
    catch (err) { console.error(err.message); }
  }

  return (    
    <main className="login-main">
      <h1 className="fw-bold text-uppercase" id="title">Đăng nhập</h1>
      <hr />

      <form className="login-form" id="login-form">
        <FormTextBox type="username" placeholder="Tên người dùng hoặc email" icon="bi-person-fill" value={username} onValueChange={handleUsername} errorValue={errorUsername} />
        <FormTextBox type="password" placeholder="Mật khẩu" icon="bi-lock-fill" value={password} onValueChange={handlePassword} errorValue={errorPassword} />
        <div className="text-start">
          <a className="switch-page" onClick={showForgetForm}>Quên mật khẩu?</a>
        </div>
        
        <input type="submit" className="at-btn m-at-btn" value="Đăng nhập" onClick={LoginUser} />
        <div className="switch-question mt-3">
          Hoặc có thể đăng nhập bằng:
          <abbr title="Google" className="pointer">
            <img src="google.webp" alt="Google" onClick={GoogleLogin} className="redirect-icon mx-2" />
          </abbr>
        </div>
        <div className="switch-question">Bạn chưa có tài khoản? <a className="switch-page pointer" onClick={showSignupForm}>Đăng ký ngay!</a></div>
      </form>

      <Register />
      <ForgetPassword />
    </main>
  )
}
import "./Login.css"
import FormTextBox from "/src/Components/shared/FormTextBox"
import { useState } from 'react'
import { auth } from "/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgetPassword() {
  let [username, setUsername] = useState("");
  let [phone, setPhone] = useState("");
  let [email, setEmail] = useState("");
  let [errorUsername, setErrorUsername] = useState("");
  let [errorPhone, setErrorPhone] = useState("");
  let [errorEmail, setErrorEmail] = useState("");

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

  async function RegisterUser(e) {
    e.preventDefault();

    handleErrorUsername();
    handleErrorPhone();
    handleErrorEmail();

    if (!(errorUsername === "" && errorPhone === "" && errorEmail === "")) return;
    
    if (confirm("Bạn có chắc chắn về thông tin đã nhập chưa?")) {
      //const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const response = await fetch("/user/forgetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({username, phone, email})
      })

      if (response.ok) {
        alert("Vui lòng kiểm tra email của bạn để khôi phục mật khẩu nhé!");
        await sendPasswordResetEmail(auth, email);
        location.reload();
      }
      else if (response.status === 400) alert("Vui lòng kiểm tra lại thông tin!");
      else alert("Đã có lỗi từ hệ thống, vui lòng thử lại sau!");
    }
  }

  return (
    <form className="login-form disabled" id="forget-form">
      <FormTextBox type="usernameFP" placeholder="Username" icon="bi-person-fill" value={username} onValueChange={handleUsername} errorValue={errorUsername} />
      <FormTextBox type="phoneFP" placeholder="Số điện thoại" icon="bi-telephone-fill" value={phone} onValueChange={handlePhone} errorValue={errorPhone} />
      <FormTextBox type="emailFP" placeholder="Địa chỉ email" icon="bi-envelope-at-fill" value={email} onValueChange={handleEmail} errorValue={errorEmail} />
      
      <input type="submit" className="at-btn m-at-btn" value="Gửi email khôi phục" onClick={e => RegisterUser(e)} />
      <div className="switch-question">Bạn đã nhớ ra mật khẩu? <a className="switch-page pointer" onClick={e => showLoginForm(e)}>Đăng nhập ngay!</a></div>
    </form>
  )
}

function showLoginForm(e) {
  e.preventDefault();
  document.title = document.getElementById("title").innerHTML = "Đăng nhập";
  document.title += " tài khoản";
  document.getElementById("forget-form").classList.add("disabled");
  document.getElementById("login-form").classList.remove("disabled");
}
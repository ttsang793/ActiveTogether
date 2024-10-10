import "./Login.css"
import FormTextBox from "/src/Components/FormTextBox"

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

export default function Login() {
  return (    
    <main>
      <h1 className="flex-grow-1 text-center fw-bold text-uppercase" id="title">Đăng nhập</h1>
      <hr />

      <form className="login-form" id="login-form">
        <FormTextBox type="usernameLG" placeholder="Tên người dùng" icon="bi-person-fill" />
        <FormTextBox type="passwordLG" placeholder="Mật khẩu" icon="bi-lock-fill" />
        <div className="d-flex w-100 justify-content-between">
          <div className="mt-2">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">&nbsp;Ghi nhớ tài khoản</label>
          </div>
          <a className="switch-page" href="">Quên mật khẩu?</a>
        </div>
        
        <input type="submit" className="at-btn m-at-btn" value="Đăng nhập" />
        <div className="switch-question">Bạn chưa có tài khoản? <a className="switch-page" onClick={e => showSignupForm(e)}>Đăng ký ngay!</a></div>
      </form>

      <form className="login-form disabled" id="sign-up-form">
        <FormTextBox type="usernameSU" placeholder="Tên người dùng" icon="bi-person-fill" />
        <FormTextBox type="passwordSU" placeholder="Mật khẩu" icon="bi-lock-fill" />
        <FormTextBox type="confirmpasswordSU" placeholder="Xác nhận mật khẩu" icon="bi-lock-fill" />
        <FormTextBox type="phoneSU" placeholder="Số điện thoại" icon="bi-telephone-fill" />
        <FormTextBox type="emailSU" placeholder="Địa chỉ email" icon="bi-envelope-at-fill" />
        <FormTextBox type="addressSU" placeholder="Địa chỉ nhà" icon="bi-house-door-fill" />
        
        <input type="submit" className="at-btn m-at-btn" value="Đăng ký" />
        <div className="switch-question">Bạn đã có tài khoản? <a className="switch-page" onClick={e => showLoginForm(e)}>Đăng nhập ngay!</a></div>
      </form>
    </main>
  )
}
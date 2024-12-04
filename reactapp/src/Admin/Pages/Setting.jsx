import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PleaseWait from "/src/Shared/PleaseWait";
import AdminTextBox from "/src/Admin/Components/AdminTextBox";
import { auth } from "/firebase";
import { signOut, updatePassword } from "firebase/auth";

export default function ASetting(props) {
  let [loading, setLoading] = useState(true);
  const aId = props.username;
  let [aFullName, setAFullName] = useState("");
  let [aPhone, setAPhone] = useState("");
  const [aEmail, setAEmail] = useState("");
  let [aAvatar, setAAvatar] = useState(null);
  let [aOld, setAOld] = useState("");
  let [aNew, setANew] = useState("");
  let [aCon, setACon] = useState("");
  let [aFullNameError, setAFullNameError] = useState("");
  let [aPhoneError, setAPhoneError] = useState("");
  let [aOldError, setAOldError] = useState("");
  let [aNewError, setANewError] = useState("");
  let [aConError, setAConError] = useState("");

  useEffect(() => {
    fetch(`/api/adminuser/get?id=${props.username}`).then(response => response.json()).then(data => {
      setLoading(loading = false);
      setAFullName(aFullName = data.fullName);
      setAPhone(aPhone = data.phone)
      setAEmail(data.email);
      setAAvatar(aAvatar = data.avatar);
    })
  }, []);
  
  const handleAOldError = () => {
    let oError = "";

    if (aOld === "") oError = "Vui lòng nhập mật khẩu cũ";
    else if (!aOld.match(/^.{6,}$/gm)) oError = "Mật khẩu phải từ 6 kí tự trở lên";

    setAOldError(aOldError = oError);
    handleANewError();
  }

  const handleANewError = () => {
    let nError = "";

    if (aNew === "") nError = "Vui lòng nhập mật khẩu mới";
    else if (!aNew.match(/^.{6,}$/gm)) nError = "Mật khẩu phải từ 6 kí tự trở lên";
    else if (aOld === aNew) nError = "Mật khẩu mới phải khác mật khẩu cũ";

    setANewError(aNewError = nError);
    handleAConError();
  }

  const handleAConError = () => {
    let cError = "";

    if (aCon === "") cError = "Vui lòng xác nhận mật khẩu mới";
    else if (!aCon.match(/^.{6,}$/gm)) cError = "Mật khẩu phải từ 6 kí tự trở lên";
    else if (aNew !== aCon) cError = "Xác nhận mật khẩu phải trùng khớp với mật khẩu";

    setAConError(aConError = cError);
  }

  return loading ? <PleaseWait /> : (
    <main>        
      <h1 className="flex-grow-1 text-center fw-bold">CÀI ĐẶT TÀI KHOẢN</h1>
      <hr />

      <div className="row">
        <div className="col-9">
          <h2>Thông tin cá nhân:</h2>            
          <AdminTextBox type="text" detail="id" value={aId} readOnly placeholder="ID nhân viên" />
          <AdminTextBox type="text" detail="name" onChange={e => setAFullName(aFullName = e.target.value)} value={aFullName} errorValue={aFullNameError} placeholder="Họ tên nhân viên" />
          <AdminTextBox type="tel" detail="phone" onChange={e => setAPhone(aPhone = e.target.value)} value={aPhone} errorValue={aPhoneError} placeholder="Số điện thoại" />
          <AdminTextBox type="email" detail="email" value={aEmail} readOnly placeholder="Email nhân viên" />

          <div className="text-center">
            <input type="submit" value="Lưu" onClick={updateInfo} className="at-btn mt-3 me-2" />
            <input type="button" value="Hủy" onClick={() => location.href = "/admin/home"} className="at-btn-secondary mt-3" />
          </div>

          <h2>Mật khẩu:</h2>
          <AdminTextBox type="password" detail="old" value={aOld} onChange={e => setAOld(aOld = e.target.value)} placeholder='Mật khẩu cũ' errorValue={aOldError} />
          <AdminTextBox type="password" detail="new" value={aNew} onChange={e => setANew(aNew = e.target.value)} placeholder='Mật khẩu mới' errorValue={aNewError} />
          <AdminTextBox type="password" detail="con" value={aCon} onChange={e => setACon(aCon = e.target.value)} placeholder='Xác nhận mật khẩu mới' errorValue={aConError} />

          <div className="text-center">
            <input type="submit" value="Lưu" onClick={updateAccount} className="at-btn mt-3 me-2" />
            <input type="button" value="Hủy" onClick={() => location.href = "/admin/home"} className="at-btn-secondary mt-3" />
          </div>
        </div>

        <div className="col-3 d-flex flex-column align-items-center">
          <img src={aAvatar} alt="avatar" className="avatar w-120px" id="avatar" />
          <input type="file" id="upload-thumbnail" accept="image/*" className="disabled" onChange={handleFileUpload} />
          <input type="button" value="Chọn avatar" onClick={() => document.getElementById('upload-thumbnail').click()} className="small-at-btn mt-3" />
        </div>
      </div>
    </main>
  )

  function handleFileUpload(e) {
    setAAvatar(aAvatar = e.target.files[0])

    var reader = new FileReader();
    reader.onload = e => document.getElementById('avatar').src = e.target.result;
    reader.readAsDataURL(e.target.files[0]);
  }

  async function updateInfo() {
    if (confirm("Bạn có muốn cập nhật thông tin tài khoản?")) {
      let image = "";
    
      if (typeof(aAvatar) !== "string")
        image = "/src/images/avatar/" + "NV_" + id + aAvatar.name.substring(aAvatar.name.lastIndexOf("."));
      else image = aAvatar;
      
      const response = await fetch(`/api/adminuser/update?id=${aId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({phone: aPhone, email: aEmail, avatar: image})
      })
  
      if ((typeof(aAvatar) === "string" || uploadImage()) && response.ok) alert("Tài khoản đã được cập nhật thành công");
      else if (response.status === 200) {
        const data = await response.json();
        setAFullNameError(aFullNameError = data.errors[0]);
        setAPhoneError(aPhoneError = data.errors[1]);
      }
      else alert("Đã có lỗi xảy ra, cập nhật tài khoản thất bại.");
    }
  }

  async function uploadImage() {
    const formData = new FormData();
    formData.append('file', aAvatar);

    try {
      const response = await axios.post(`/api/adminuser/uploadavatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.status === 200;
    }
    catch (error) {
      return false
    }
  }

  async function updateAccount() {
    handleAOldError();
    handleANewError();
    handleAConError();

    if (!(aOldError === "" && aNewError === "" && aConError === "")) return;

    if (confirm("Bạn có muốn cập nhật mật khẩu?")) {
      const user = auth.currentUser;
      updatePassword(user, newPass).then(() => {
        fetch("/api/adminuser/logout", { method: "POST" }).then(() => {
          signOut(auth).then(() => { alert("Cập nhật mật khẩu thành công. Vui lòng đăng nhập lại!"); location.href = "/admin" })
        });
      }).catch(err => {
        console.error(err);
        alert("Đã có lỗi xảy ra, cập nhật mật khẩu thất bại.");
      });
    }
  }
}
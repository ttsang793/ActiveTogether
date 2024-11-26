import React, { Component } from 'react';
import axios from 'axios';
import { Encode2 } from '/src/Scripts/Utility';
import PleaseWait from "/src/Shared/PleaseWait";

export default class ASetting extends Component {
  static DisplayName = ASetting.name;

  constructor(props) {
    super(props);
    this.state = { loading: true, aId: "", aFullName: "", aPhone: "", aEmail: "", aAvatar: null, aOld: "", aNew: "", aConfirm: "" };
  }

  componentDidMount() {
    this.populateUserData(240523);
  }

  render() {
    return this.state.loading ? <PleaseWait /> : (
      <main>        
        <h1 className="flex-grow-1 text-center fw-bold">CÀI ĐẶT TÀI KHOẢN</h1>
        <hr />

        <div className="row">
          <div className="col-9">
            <h2>Thông tin cá nhân:</h2>
            <input type="text" className="form-control mt-3" value={this.state.aId} readOnly />
            <input type="text" className="form-control mt-3" value={this.state.aFullName} readOnly />
            <input type="text" className="form-control mt-3" value={this.state.aPhone} onChange={e => this.setState({aPhone: e.target.value})} />
            <input type="email" className="form-control mt-3" value={this.state.aEmail} onChange={e => this.setState({aEmail: e.target.value})} />

            <div className="text-center">
              <input type="submit" value="Lưu" onClick={() => this.updateInfo()} className="at-btn mt-3 me-2" />
              <input type="button" value="Hủy" onClick={() => location.href = "/admin"} className="at-btn-secondary mt-3" />
            </div>

            <h2>Mật khẩu:</h2>
            <input type="password" className="form-control mt-3" value={this.state.aOld} onChange={e => this.setState({aOld: e.target.value})} placeholder='Mật khẩu cũ' />
            <input type="password" className="form-control mt-3" value={this.state.aNew} onChange={e => this.setState({aNew: e.target.value})} placeholder='Mật khẩu mới' />
            <input type="password" className="form-control mt-3" value={this.state.aConfirm} onChange={e => this.setState({aConfirm: e.target.value})} placeholder='Xác nhận mật khẩu mới' />

            <div className="text-center">
              <input type="submit" value="Lưu" onClick={() => this.updateAccount()} className="at-btn mt-3 me-2" />
              <input type="button" value="Hủy" onClick={() => location.href = "/admin/home"} className="at-btn-secondary mt-3" />
            </div>
          </div>

          <div className="col-3 d-flex flex-column align-items-center">
            <img src={this.state.aAvatar} alt="avatar" className="avatar w-120px" id="avatar" />
            <input type="file" id="upload-thumbnail" accept="image/*" className="disabled" onChange={e => this.handleFileUpload(e)} />
            <input type="button" value="Chọn avatar" onClick={() => document.getElementById('upload-thumbnail').click()} className="small-at-btn mt-3" />
          </div>
        </div>
      </main>
    )
  }

  handleFileUpload(e) {
    this.setState({ aAvatar: e.target.files[0] })

    var reader = new FileReader();
    reader.onload = e => document.getElementById('avatar').src = e.target.result;
    reader.readAsDataURL(e.target.files[0]);
  }

  async updateInfo() {
    if (confirm("Bạn có muốn cập nhật thông tin tài khoản?")) {
      const id = 240523;
      let image = "";
    
      if (typeof(this.state.aAvatar) !== "string")
        image = "/src/images/avatar/" + "NV_" + id + this.state.aAvatar.name.substring(this.state.aAvatar.name.lastIndexOf("."));
      else image = this.state.aAvatar;
      
      const response = await fetch(`/api/adminuser/updateInfo?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({phone: this.state.aPhone, email: this.state.aEmail, avatar: image})
      })
  
      if ((typeof(this.state.aAvatar) === "string" || this.uploadImage()) && response.ok) {
        alert("Tài khoản đã được cập nhật thành công");
        //location.reload()
      }
      else alert("Đã có lỗi xảy ra, cập nhật tài khoản thất bại.");
    }
  }

  async uploadImage() {
    const formData = new FormData();
    formData.append('file', this.state.aAvatar);

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

  async updateAccount() {
    if (confirm("Bạn có muốn cập nhật mật khẩu?")) {
      const id = 240523;
      const response = await fetch(`/api/adminuser/updateAccount?id=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ old: Encode2(id, this.state.aOld), new: Encode2(id, this.state.aNew) })
      })
  
      if (response.ok) { alert("Cập nhật mật khẩu thành công. Vui lòng đăng nhập lại"); location.href = '/admin' }
      else alert("Đã có lỗi xảy ra, cập nhật mật khẩu thất bại.");
    }
  }

  async populateUserData(id) {
    fetch(`/api/adminuser/get?id=${id}`).then(response => response.json()).then(data => {
      this.setState({ loading: false, aId: data.id, aFullName: data.fullName, aPhone: data.phone, aEmail: data.email, aAvatar: data.avatar })
    })
  }
}
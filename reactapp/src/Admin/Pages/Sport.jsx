import React, { Component } from "react"
import axios from 'axios';
import { CamelToKebab } from "/src/Scripts/Utility"
import AdminTextBox from "/src/Admin/Components/AdminTextBox";
import "./Sport.css"

export default class ASport extends Component {
  static displayName = ASport.name;

  constructor(props) {
    super(props);
    this.state = {sport: [], sId: "", sName: "", sImage: null, sNameError: "", sImageError: "", sSearch: "" }
  }

  componentDidMount() { this.populateSportData() }

  renderTable(sports) {
    return (
      <>
        {
          sports.map(s => 
            <tr key={s.id}>
              <td className="align-middle">
                <img src={s.image} alt={s.name} className="sport-thumbnail" />
              </td>
              <td className="align-middle">{s.id}</td>
              <td className="align-middle">{s.name}</td>
              <td className="align-middle">
                <i className="bi bi-gear" onClick={() => this.handleOnClickRow(s)}></i>
                <i className={`bi bi-${s.isActive ? "lock" : "unlock"}`} onClick={() => deleteSport(s.id, s.isActive)}></i>
              </td>
            </tr>
          )
        }
      </>
    )
  }

  handleFileUpload(e) {
    this.setState({ sImage: e.target.files[0] })

    var reader = new FileReader();
    reader.onload = e => document.getElementById('small-image').src = e.target.result;
    reader.readAsDataURL(e.target.files[0]);
  }

  handleDeleteImage() {
    this.setState({ sImage: null })
    document.getElementById('small-image').src = "/src/images/avatar/default.jpg";
  }

  handleOnClickRow(s) {
    document.getElementById('small-image').src = s.image;
    this.setState({ sId: s.id, sName: s.name, sImage: s.image });
  }

  render() {
    return (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">CÁC MÔN THỂ THAO</h1>
        <hr />

        <div className="row">
          <div className="col-3">
            <AdminTextBox type="text" detail="id" value={this.state.sId} readOnly placeholder="Mã môn thể thao" />
            <AdminTextBox type="text" detail="name" onChange={(e) => this.setState({sName: e.target.value})} value={this.state.sName} errorValue={this.state.sNameError} placeholder="Tên môn thể thao" />
            
            <div className="mt-3">
              <input type="file" id="upload-thumbnail" onChange={e => this.handleFileUpload(e)} accept="image/*" className="disabled" />
              <input type="button" value="Chọn hình" onClick={() => document.getElementById('upload-thumbnail').click()} className="small-at-btn mb-2" />
              <div id="image-container" className="image-container mb-2">
                <button className="close small-at-sbtn" onClick={() => this.handleDeleteImage()}>&times;</button>
                <img id="small-image" src="/src/images/avatar/default.jpg" style={{maxWidth: "150px", width: "100%"}} />
                <div id="image-error" className="error-value">{this.state.sImageError}</div>
              </div>
            </div>
            
            <input type="submit" value="Lưu" onClick={e => this.saveNewSport(e)} className="at-btn mt-3 me-2" />
            <input type="button" value="Hủy" onClick={() => this.cancelSport()} className="at-btn-secondary mt-3" />
          </div>

          <div className="col-9">
            <div className="d-flex">
              <AdminTextBox type="search" placeholder="Nhập môn thể thao cần tìm..." value={this.state.sSearch} onChange={e => this.setState({ sSearch: e.target.value })} onKeyDown={() => this.findData()} />
              <button className="small-at-sbtn"><i className="bi bi-search"></i></button>
            </div>

            <table className="table table-striped table-hover pointer table-bordered mt-3">
              <thead>
                <tr>
                  <th className="w-10"></th>
                  <th className="w-10 text-center">ID</th>
                  <th className="text-center">Tên môn thể thao</th>
                  <th className="w-120px"></th>
                </tr>
              </thead>

              <tbody className="table-group-divider">
                {this.renderTable(this.state.sport)}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    )
  }

  async populateSportData() {
    fetch("/api/sport/get").then(response => response.json()).then(data => this.setState({sport: data}));
  }

  async findData() {
    if (this.state.sSearch === "") this.populateSportData();
    else fetch(`/api/sport/find?name=${this.state.sSearch}`).then(response => response.json()).then(data => this.setState({sport: data}));
  }

  cancelSport() {
    this.handleDeleteImage();
    this.setState({ sId: "", sName: "", sImage: null, sNameError: "", sImageError: "" });
  }

  async saveNewSport(e) {
    e.preventDefault();
    let flagError = false;

    if (this.state.sName === "") { this.setState({sNameError: "Vui lòng nhập tên danh mục"}); flagError = true; }
    else if (this.state.sport.findIndex(c => c.name === this.state.sName) > -1) { this.setState({sNameError: "Tên danh mục không được trùng với danh mục đã tạo"}); flagError = true }

    let fileName = "";
    
    if (typeof(this.state.sImage) !== "string")
    {
      if (!this.state.sImage) {
        this.setState({sImageError: "Vui lòng chọn hình tiêu đề của môn thể thao!"});
        flagError = true;
      }
      fileName = "/src/images/sport/" + CamelToKebab(this.state.sName) + this.state.sImage.name.substring(this.state.sImage.name.lastIndexOf("."));
    }
    else fileName = "/src/images/sport/" + CamelToKebab(this.state.sName) + this.state.sImage.substring(this.state.sImage.lastIndexOf("."));

    if (flagError) return;
    
    
    (this.state.sId !== "") ? this.updateSport(this.state.sId, this.state.sName, fileName) : this.addSport(this.state.sName, fileName);
  }

  async addSport(name, image) {
    if (confirm("Bạn có chắc chắn thêm môn thể thao này?"))  {
      const response = await fetch("/api/sport/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({name, image})
      })

      if (this.uploadImage() && response.ok) { alert("Thêm môn thể thao thành công."); location.reload(); }
      else alert("Đã có lỗi xảy ra. Thêm môn thể thao thất bại.")
    }
  }

  async updateSport(id, name, image) {
    if (confirm("Bạn có chắc chắn cập nhật môn thể thao này?"))  {
      const response = await fetch(`/api/sport/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({id, name, image})
      })

      if (this.uploadImage() && response.ok) { alert("Cập nhật môn thể thao thành công."); location.reload(); }
      else alert("Đã có lỗi xảy ra. Cập nhật môn thể thao thất bại.")
    }
  }

  async uploadImage() {
    const formData = new FormData();
    formData.append('file', this.state.sImage);

    try {
      const response = await axios.post('/api/sport/image/upload', formData, {
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
}

async function deleteSport(id, isActive) {
  const action = isActive ? "khóa" : "mở khóa"
  if (confirm(`Bạn có chắc chắn ${action} môn thể thao này?`)) {
    const url = isActive ? `/api/sport/lock?id=${id}` : `/api/sport/unlock?id=${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({id})
    })

    if (response.ok) { alert(`Môn thể thao đã ${action} thành công.`); location.reload(); }
    else alert(`Đã có lỗi xảy ra. Môn thể thao đã ${action} thất bại.`)
  }
}
import React, { Component } from "react";
import AdminTextBox from "/src/Admin/Components/AdminTextBox";

export default class ABrand extends Component {
  static displayName = ABrand.name;

  constructor(props) {
    super(props);
    this.state = {brand: [], bId: "", bName: "", bNameError: "", bSearch: ""}
  }

  componentDidMount() { this.populateBrandData() }

  async saveNewBrand(e) {
    e.preventDefault();
    if (this.state.bName === "") this.setState({bNameError: "Vui lòng nhập tên thương hiệu"})
    else if (this.state.brand.findIndex(b => b.name === this.state.bName) > -1) this.setState({bNameError: "Tên thương hiệu không được trùng với thương hiệu đã tạo"})
    else (this.state.bId !== "") ? updateBrand(this.state.bId, this.state.bName) : addBrand(this.state.bName);
  }

  renderTable(brands) {
    return (
      <>
        {
          brands.map(b => 
            <tr key={b.id}>
              <td className="align-middle">{b.id}</td>
              <td className="align-middle">{b.name}</td>
              <td>
                <i className="bi bi-gear" onClick={() => this.setState({bId: b.id, bName: b.name})}></i>
                <i className={`bi bi-${b.isActive ? "lock" : "unlock"}`} onClick={() => deleteBrand(b.id, b.isActive)}></i>
              </td>
            </tr>
          )
        }
      </>
    )
  }

  render() {
    return (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">THƯƠNG HIỆU</h1>
        <hr />


        <div className="row">
          <div className="col-3">            
            <AdminTextBox type="text" detail="id" value={this.state.bId} readOnly placeholder="Mã thương hiệu" />
            <AdminTextBox type="text" detail="name" onChange={(e) => this.setState({bName: e.target.value})} value={this.state.bName} errorValue={this.state.bNameError} placeholder="Tên thương hiệu" />
              
            <input type="submit" value="Lưu" onClick={e => this.saveNewBrand(e)} className="at-btn mt-3 me-2" />
            <input type="button" value="Hủy" onClick={() => this.cancelBrand()} className="at-btn-secondary mt-3" />
          </div>

          <div className="col-9">
            <div className="d-flex">
              <AdminTextBox type="search" placeholder="Nhập tên thương hiệu cần tìm..." value={this.state.bSearch} onChange={e => this.setState({ bSearch: e.target.value })} onKeyDown={() => this.findData()} />
              <button className="small-at-sbtn"><i className="bi bi-search"></i></button>
            </div>
            
            <table className="table table-striped table-bordered table-hover pointer mt-3">
              <thead>
                <tr>
                  <th className="text-center w-10 align-middle">ID</th>
                  <th className="text-center align-middle">Tên thương hiệu</th>
                  <th className="w-120px"></th>
                </tr>
              </thead>

              <tbody className="table-group-divider">
                {this.renderTable(this.state.brand)}
              </tbody>
            </table>   
          </div>
        </div>
      </main>
    )
  }

  async populateBrandData() {
    fetch("/api/brand/get").then(response => response.json()).then(data => this.setState({brand: data}));
  }

  async findData() {
    if (this.state.bSearch === "") this.populateBrandData();
    else fetch(`/api/brand/find?name=${this.state.bSearch}`).then(response => response.json()).then(data => this.setState({brand: data}));
  }

  cancelBrand() {
    this.setState({bId: "", bName: ""})
  }
}

async function addBrand(name) {
  if (confirm("Bạn có chắc chắn thêm thương hiệu này?"))  {
    const response = await fetch("/api/brand/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({name})
    })

    if (response.ok) { alert("Thêm thương hiệu thành công."); location.reload(); }
    else alert("Đã có lỗi xảy ra. Thêm thương hiệu thất bại.")
  }
}

async function updateBrand(id, name) {
  if (confirm("Bạn có chắc chắn cập nhật thương hiệu này?"))  {
    const response = await fetch(`/api/brand/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({id, name})
    })

    if (response.ok) { alert("Cập nhật thương hiệu thành công."); location.reload(); }
    else alert("Đã có lỗi xảy ra. Cập nhật thương hiệu thất bại.")
  }
}

async function deleteBrand(id, isActive) {
  const action = isActive ? "khóa" : "mở khóa"
  if (confirm(`Bạn có chắc chắn ${action} thương hiệu này?`)) {
    const url = isActive ? `/api/brand/lock?id=${id}` : `/api/brand/unlock?id=${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({id})
    })

    if (response.ok) { alert(`Thương hiệu đã ${action} thành công.`); location.reload(); }
    else alert(`Đã có lỗi xảy ra. Thương hiệu đã ${action} thất bại.`)
  }
}
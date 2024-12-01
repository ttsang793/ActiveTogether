import React, { Component } from "react";
import AdminTextBox from "/src/Admin/Components/AdminTextBox";

export default class ACategory extends Component {
  static displayName = ACategory.name;

  constructor(props) {
    super(props);
    this.state = {category: [], cId: "", cName: "", cNameError: "", cSearch: ""}
  }

  componentDidMount() { this.populateCategoryData() }

  async saveNewCategory(e) {
    e.preventDefault();
    if (this.state.cName === "") this.setState({cNameError: "Vui lòng nhập tên danh mục"})
    else if (this.state.category.findIndex(c => c.name === this.state.cName) > -1) this.setState({cNameError: "Tên danh mục không được trùng với danh mục đã tạo"})
    else (this.state.cId !== "") ? updateCategory(this.state.cId, this.state.cName) : addCategory(this.state.cName);
  }

  renderTable(categories) {
    return (
      <>
        {
          categories.map(c => 
            <tr key={c.id} className="pointer">
              <td className="align-middle">{c.id}</td>
              <td className="align-middle">{c.name}</td>
              <td>
                <i className="bi bi-gear" onClick={() => this.setState({cId: c.id, cName: c.name})}></i>
                <i className={`bi bi-${c.isActive ? "lock" : "unlock"}`} onClick={() => deleteCategory(c.id, c.isActive)}></i>
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
        <h1 className="flex-grow-1 text-center fw-bold">LOẠI SẢN PHẨM</h1>
        <hr />

        <div className="row">
          <div className="col-3">
            <AdminTextBox type="text" detail="id" value={this.state.cId} readOnly placeholder="Mã loại" />
            <AdminTextBox type="text" detail="name" onChange={(e) => this.setState({cName: e.target.value})} value={this.state.cName} errorValue={this.state.cNameError} placeholder="Tên loại" />

            <input type="submit" value="Lưu" onClick={e => this.saveNewCategory(e)} className="at-btn mt-3 me-2" />
            <input type="button" value="Hủy" onClick={() => this.cancelCategory()} className="at-btn-secondary mt-3" />
          </div>

          <div className="col-9">
            <div className="d-flex">
              <AdminTextBox type="search" placeholder="Nhập tên loại sản phẩm cần tìm..." value={this.state.cSearch} onChange={e => this.setState({ cSearch: e.target.value })} onKeyDown={() => this.findData()} />
              <button className="small-at-sbtn" onClick={() => this.findData()}><i className="bi bi-search"></i></button>
            </div>

            
            <table className="table table-striped table-bordered table-hover pointer mt-3">
              <thead>
                <tr>
                  <th className="text-center w-10 align-middle">ID</th>
                  <th className="text-center align-middle">Tên loại</th>
                  <th className="w-120px"></th>
                </tr>
              </thead>

              <tbody className="table-group-divider">
                {this.renderTable(this.state.category)}
              </tbody>
            </table>   
          </div>
        </div>
      </main>
    )
  }

  async populateCategoryData() {
    fetch("/api/category/get").then(response => response.json()).then(data => this.setState({category: data}));
  }

  async findData() {
    if (this.state.cSearch === "") this.populateCategoryData();
    else fetch(`/api/category/find?name=${this.state.cSearch}`).then(response => response.json()).then(data => this.setState({category: data}));
  }

  cancelCategory() {
    this.setState({cId: "", cName: "", cNameError: ""});
  }
}

async function addCategory(name) {
  if (confirm("Bạn có chắc chắn thêm loại sản phẩm này?"))  {
    const response = await fetch("/api/category/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({name})
    })

    if (response.ok) { alert("Thêm loại sản phẩm thành công."); location.reload(); }
    else alert("Đã có lỗi xảy ra. Thêm loại sản phẩm thất bại.")
  }
}

async function updateCategory(id, name) {
  if (confirm("Bạn có chắc chắn cập nhật loại sản phẩm này?"))  {
    const response = await fetch(`/api/category/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({id, name})
    })

    if (response.ok) { alert("Cập nhật loại sản phẩm thành công."); location.reload(); }
    else alert("Đã có lỗi xảy ra. Cập nhật loại sản phẩm thất bại.")
  }
}

async function deleteCategory(id, isActive) {
  const action = isActive ? "khóa" : "mở khóa"
  if (confirm(`Bạn có chắc chắn ${action} loại sản phẩm này?`)) {
    const url = isActive ? `/api/category/lock?id=${id}` : `/api/category/unlock?id=${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({id})
    })

    if (response.ok) { alert(`Loại sản phẩm đã ${action} thành công.`); location.reload(); }
    else alert(`Đã có lỗi xảy ra. Loại sản phẩm đã ${action} thất bại.`)
  }
}
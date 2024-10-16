import React, { Component } from "react"

async function addCategory(name) {
  if (confirm("Bạn có chắc chắn thêm loại sản phẩm này?"))  {
    const response = await fetch("/api/category/Add", {
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
    const response = await fetch(`/api/category/Update?id=${id}`, {
      method: "POST",
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

async function deleteCategory(id) {
  if (confirm("Bạn có chắc chắn xóa loại sản phẩm này?")) {
    const response = await fetch(`/api/category/Delete?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({id})
    })

    if (response.ok) { alert("Xóa loại sản phẩm thành công."); location.reload(); }
    else alert("Đã có lỗi xảy ra. Xóa loại sản phẩm thất bại.")
  }
}

export default class Category extends Component {
  static displayName = Category.name;

  constructor(props) {
    super(props);
    this.state = {category: [], cId: "", cName: ""}
  }

  componentDidMount() { this.populateCategoryData() }

  async saveNewCategory(e) {
    e.preventDefault();
    (this.state.cId !== "") ? updateCategory(this.state.cId, this.state.cName) : addCategory(this.state.cName);
  }

  renderTable(categories) {
    return (
      <>
        {
          categories.map(c => 
            <tr key={c.id} onClick={() => this.setState({cId: c.id, cName: c.name})}>
              <td className="align-middle">{c.id}</td>
              <td className="align-middle">{c.name}</td>
              <td>
                <button className="at-btn" onClick={() => deleteCategory(c.id)}>Xóa</button>
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

        <div className="d-flex c-10">
          <input type="text" value={this.state.cId} className="form-control" readOnly placeholder="Mã loại" />
          <input type="text" onChange={(e) => this.setState({cName: e.target.value})} value={this.state.cName} className="form-control" placeholder="Tên loại" />
          
          <input type="submit" value="Lưu" onClick={e => this.saveNewCategory(e)} className="at-btn" />
        </div>

        <table className="table table-striped table-bordered mt-3">
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Tên loại</th>
              <th className="w-10"></th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {this.renderTable(this.state.category)}
          </tbody>
        </table>
      </main>
    )
  }

  async populateCategoryData() {
    fetch("/api/category/All").then(response => response.json()).then(data => this.setState({category: data}));
  }
}
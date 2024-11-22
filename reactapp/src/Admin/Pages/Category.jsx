import React, { Component } from "react"

export default class ACategory extends Component {
  static displayName = ACategory.name;

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
            <tr key={c.id} onClick={() => this.setState({cId: c.id, cName: c.name})} className="pointer">
              <td className="align-middle">{c.id}</td>
              <td className="align-middle">{c.name}</td>
              <td>
                <button className="small-at-btn" onClick={() => deleteCategory(c.id, c.isActive)}>{c.isActive? "Khóa" : "Mở khóa"}</button>
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

        <table className="table table-striped table-bordered table-hover pointer mt-3">
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
    fetch("/api/category/get").then(response => response.json()).then(data => this.setState({category: data}));
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
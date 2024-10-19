import React, { Component } from "react"

export default class ABrand extends Component {
  static displayName = ABrand.name;

  constructor(props) {
    super(props);
    this.state = {brand: [], bId: "", bName: ""}
  }

  componentDidMount() { this.populateBrandData() }

  async saveNewBrand(e) {
    e.preventDefault();
    (this.state.bId !== "") ? updateBrand(this.state.bId, this.state.bName) : addBrand(this.state.bName);
  }

  renderTable(brands) {
    return (
      <>
        {
          brands.map(b => 
            <tr key={b.id} onClick={() => this.setState({bId: b.id, bName: b.name})}>
              <td className="align-middle">{b.id}</td>
              <td className="align-middle">{b.name}</td>
              <td>
                <button className="small-at-btn" onClick={() => deleteBrand(b.id, b.isAcvite)}>{b.isActive? "Khóa" : "Mở khóa"}</button>
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

        <div className="d-flex c-10">
          <input type="text" value={this.state.bId} className="form-control" readOnly placeholder="Mã thương hiệu" />
          <input type="text" onChange={(e) => this.setState({bName: e.target.value})} value={this.state.bName} className="form-control" placeholder="Tên thương hiệu" />
          
          <input type="submit" value="Lưu" onClick={e => this.saveNewBrand(e)} className="at-btn" />
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
            {this.renderTable(this.state.brand)}
          </tbody>
        </table>
      </main>
    )
  }

  async populateBrandData() {
    fetch("/api/brand/All").then(response => response.json()).then(data => this.setState({brand: data}));
  }
}

async function addBrand(name) {
  if (confirm("Bạn có chắc chắn thêm thương hiệu này?"))  {
    const response = await fetch("/api/brand/Add", {
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
    const response = await fetch(`/api/brand/Update?id=${id}`, {
      method: "POST",
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
    const response = await fetch(`/api/brand/Delete?id=${id}`, {
      method: "POST",
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
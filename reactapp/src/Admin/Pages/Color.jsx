import React, { Component } from "react"
import "./Color.css";

export default class AColor extends Component {
  static displayName = AColor.name;

  constructor(props) {
    super(props);
    this.state = {color: [], cCode: "", cName: ""}
  }

  componentDidMount() { this.populateColorData() }

  async saveNewColor(e) {
    e.preventDefault();
    (this.state.bId !== "") ? updateColor(this.state.bId, this.state.bName) : addColor(this.state.bName);
  }

  renderTable(colors) {
    return (
      <>
        {
          colors.map(c => 
            <tr key={c.code} onClick={() => this.setState({cCode: c.code, cName: c.name})}>
              <td className="align-middle">
                <div className="color-viewer" style={{ backgroundColor: c.code }} ></div>
              </td>
              <td className="align-middle">{c.name}</td>
              <td>
                <button className="small-at-btn" onClick={() => deleteColor(c.id, c.isActive)}>{c.isActive? "Khóa" : "Mở khóa"}</button>
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
        <h1 className="flex-grow-1 text-center fw-bold">MÀU SẮC</h1>
        <hr />

        <div className="d-flex c-10">
          <input type="color" value={this.state.cCode} className="form-control color-picker" />
          <input type="text" onChange={(e) => this.setState({cName: e.target.value})} value={this.state.cName} className="form-control" placeholder="Tên màu sắc" />
          
          <input type="submit" value="Lưu" onClick={e => this.saveNewColor(e)} className="at-btn" />
        </div>

        <table className="table table-striped table-bordered table-hover pointer mt-3">
          <thead>
            <tr>
              <th className="w-10"></th>
              <th className="text-center">Tên màu sắc</th>
              <th className="w-10"></th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {this.renderTable(this.state.color)}
          </tbody>
        </table>
      </main>
    )
  }

  async populateColorData() {
    fetch("/api/color/get").then(response => response.json()).then(data => this.setState({color: data}));
  }
}

async function addColor(name) {
  if (confirm("Bạn có chắc chắn thêm màu sắc này?"))  {
    const response = await fetch("/api/color/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({name})
    })

    if (response.ok) { alert("Thêm màu sắc thành công."); location.reload(); }
    else alert("Đã có lỗi xảy ra. Thêm màu sắc thất bại.")
  }
}

async function updateColor(code, name) {
  if (confirm("Bạn có chắc chắn cập nhật màu sắc này?"))  {
    const response = await fetch(`/api/color/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({code, name})
    })

    if (response.ok) { alert("Cập nhật màu sắc thành công."); location.reload(); }
    else alert("Đã có lỗi xảy ra. Cập nhật màu sắc thất bại.")
  }
}

async function deleteColor(code, isActive) {
  const action = isActive ? "khóa" : "mở khóa"
  if (confirm(`Bạn có chắc chắn ${action} màu sắc này?`)) {
    const url = isActive ? `/api/color/lock?code=${code}` : `/api/color/unlock?code=${code}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({code})
    })

    if (response.ok) { alert(`Thương hiệu đã ${action} thành công.`); location.reload(); }
    else alert(`Đã có lỗi xảy ra. Thương hiệu đã ${action} thất bại.`)
  }
}
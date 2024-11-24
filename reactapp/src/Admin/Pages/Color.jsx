import React, { Component } from "react"
import "./Color.css";

export default class AColor extends Component {
  static displayName = AColor.name;

  constructor(props) {
    super(props);
    this.state = {color: [], cCode: "#000000", cName: ""}
  }

  componentDidMount() { this.populateColorData() }

  async saveNewColor(e) {
    e.preventDefault();
    (this.state.cId !== "") ? updateColor(this.state.cId, this.state.cName) : addColor(this.state.cName);
  }

  renderTable(colors) {
    return (
      <>
        {
          colors.map(c => 
            <tr key={c.code}>
              <td className="align-middle">
                <div className="color-viewer" style={{ backgroundColor: c.code }} ></div>
              </td>
              <td className="align-middle">{c.name}</td>
              <td>
                <i className="bi bi-gear" onClick={() => this.setState({cCode: c.code, cName: c.name})}></i>
                <i className={`bi bi-${c.isActive ? "lock" : "unlock"}`} onClick={() => deleteColor(c.code, c.isActive)}></i>
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

        <div className="row">
          <div className="col-3">
            <div className="d-flex">
              <input type="color" value={this.state.cCode} onChange={e => this.setState({cCode: e.target.value})} className="form-control color-picker" />
              <input type="text" value={this.state.cCode.toUpperCase()} className="form-control" readOnly />
            </div>
            <input type="text" onChange={e => this.setState({cName: e.target.value})} value={this.state.cName} className="form-control mt-3" placeholder="Tên màu sắc" />
            
            <input type="submit" value="Lưu" onClick={e => addColor(e, this.state.cCode, this.state.cName)} className="at-btn mt-3 me-2" />
            <input type="button" value="Hủy" onClick={() => this.cancelColor()} className="at-btn-secondary mt-3" />
          </div>

          <div className="col-9">
            <div className="d-flex">
              <input type="search" className="form-control" placeholder="Nhập tên màu sắc cần tìm..." />
              <button className="small-at-sbtn"><i className="bi bi-search"></i></button>
            </div>

            <table className="table table-striped table-bordered table-hover pointer mt-3">
              <thead>
                <tr>
                  <th className="w-10"></th>
                  <th className="text-center">Tên màu sắc</th>
                  <th className="w-120px"></th>
                </tr>
              </thead>

              <tbody className="table-group-divider">
                {this.renderTable(this.state.color)}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    )
  }

  async populateColorData() {
    fetch("/api/color/get").then(response => response.json()).then(data => this.setState({color: data}));
  }

  cancelColor() {
    this.setState({cCode: "#000000", cName: ""});
  }
}

async function addColor(e, code, name) {
  e.preventDefault();
  code = "%23" + code.substring(1).toUpperCase();

  if (confirm("Bạn có chắc chắn lưu màu sắc này?"))  {
    const response = await fetch("/api/color/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({code, name})
    })

    if (response.status == 200) { alert("Thêm màu sắc thành công."); location.reload(); }
    else if (response.status == 201) { alert("Cập nhật màu sắc thành công."); location.reload(); }
    else alert("Đã có lỗi xảy ra. Lưu màu sắc thất bại.")
  }
}

async function deleteColor(code, isActive) {
  code = "%23" + code.substring(1);

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

    if (response.ok) { alert(`Màu sắc đã ${action} thành công.`); location.reload(); }
    else alert(`Đã có lỗi xảy ra. Mầu sắc đã ${action} thất bại.`)
  }
}
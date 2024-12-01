import React, { Component } from "react"
import "./Color.css";
import AdminTextBox from "/src/Admin/Components/AdminTextBox";

export default class AColor extends Component {
  static displayName = AColor.name;

  constructor(props) {
    super(props);
    this.state = {color: [], cCode: "#000000", cName: "", cCodeError: "", cNameError: "", cSearch: ""}
  }

  componentDidMount() { this.populateColorData() }

  async saveNewColor(e) {
    e.preventDefault();
    if (this.state.cName === "") this.setState({cNameError: "Vui lòng nhập tên màu sắc"})
    else if (this.state.color.findIndex(c => c.name === this.state.cName) > -1) this.setState({cNameError: "Tên màu sắc không được trùng với các màu sắc khác"})
    else {  
      if (confirm("Bạn có chắc chắn lưu màu sắc này?"))  {
        const response = await fetch("/api/color/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({code: this.state.cCode.toUpperCase(), name: this.state.cName})
        })
    
        if (response.status == 200) { alert("Lưu màu sắc thành công."); location.reload(); }
        else alert("Đã có lỗi xảy ra. Lưu màu sắc thất bại.")
      }
    }
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
            <label htmlFor="code-error" className="fw-semibold">Mã màu sắc:</label>
            <div className="d-flex mt-1 mb-3">
              <input type="color" value={this.state.cCode} onChange={e => this.setState({cCode: e.target.value})} className="form-control color-picker" />
              <input type="text" value={this.state.cCode.toUpperCase()} className="form-control" readOnly />
              <div id="code-error" className="error-value">{this.state.cCodeError}</div>
            </div>
            <AdminTextBox type="text" detail="name" onChange={(e) => this.setState({cName: e.target.value})} value={this.state.cName} errorValue={this.state.cNameError} placeholder="Tên màu sắc" />

            <input type="submit" value="Lưu" onClick={e => this.saveNewColor(e)} className="at-btn mt-3 me-2" />
            <input type="button" value="Hủy" onClick={() => this.cancelColor()} className="at-btn-secondary mt-3" />
          </div>

          <div className="col-9">
            <div className="d-flex">
              <AdminTextBox type="search" placeholder="Nhập tên màu sắc cần tìm..." value={this.state.cSearch} onChange={e => this.setState({ cSearch: e.target.value })} onKeyDown={() => this.findData()} />
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

  async findData() {
    if (this.state.cSearch === "") this.populateColorData();
    else fetch(`/api/color/find?name=${this.state.cSearch}`).then(response => response.json()).then(data => this.setState({color: data}));
  }  

  cancelColor() {
    this.setState({cCode: "#000000", cName: "", cCodeError: "", cNameError: ""});
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
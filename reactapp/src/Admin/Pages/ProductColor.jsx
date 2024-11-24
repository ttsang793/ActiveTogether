import React, { Component } from "react"
import PleaseWait from "/src/Shared/PleaseWait"

export default class AProductColor extends Component {
  static displayName = AProductColor.name;

  constructor(props) {
    super(props);
    this.state = { color: [], productColor: [], cId: "", cCode: "" }
  }

  componentDidMount() {
    const id = Number(location.pathname.substring(location.pathname.lastIndexOf("/") + 1));
    this.populateColorData();
    this.populateProductColorData(id);
  }

  handleColorChange(e) {
    this.setState({ cCode: e.target.value })
  }


  async saveNewProductColor(e) {
    e.preventDefault();
    (this.state.cId !== "") ? updateProductColor(this.state.cId, this.state.cCode) : addProductColor(this.state.cCode);
  }

  renderTable(colors) {
    return (
      <>
        {
          colors.map(c => 
            <tr key={c.id}>
              <td className="align-middle">{c.image}</td>
              <td className="align-middle">{c.id}</td>
              <td className="align-middle">{c.color.code}</td>
              <td className="align-middle">{c.color.name}</td>
              <td>
                <a href={`/admin/thong-tin-mau-sac-san-pham/${c.id}`}>
                  <i className="bi bi-eye"></i>
                </a>
                <i className="bi bi-gear" onClick={() => this.setState({cId: c.Id, cCode: c.color.code})}></i>
                <i className={`bi bi-${c.isActive ? "lock" : "unlock"}`} onClick={() => deleteProductColor(c.id, c.isActive)}></i>
              </td>
            </tr>
          )
        }
      </>
    )
  }

  render() {
    return this.state.loading ? <PleaseWait /> : (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">MÀU SẮC SẢN PHẨM</h1>
        <hr />

        <div className="row">
          <div className="col-3">
            <input type="text" value={this.state.cId} className="form-control" readOnly placeholder="ID chi tiết" />            

            <div className="mt-3">
              <select className="form-control" value={this.state.cCode}>
                <option value="" disabled selected hidden>Màu sản phẩm</option>
                {
                  this.state.color.map(c => <option key={c.code} value={c.code} onChange={e => this.handleColorChange(e)}>{c.code} - {c.name}</option>)
                }
              </select>
            </div>
          </div>

          <div className="col-9">            
            <table className="table table-striped table-bordered table-hover pointer mt-3">
              <thead>
                <tr>
                  <th className="text-center align-middle"></th>
                  <th className="text-center w-10 align-middle">ID</th>
                  <th className="text-center align-middle">Màu sắc</th>
                  <th className="w-120px"></th>
                </tr>
              </thead>

              <tbody className="table-group-divider">
                {this.renderTable(this.state.productColor)}
              </tbody>
            </table>   
          </div>
        </div>
      </main>
    )
  }

  async populateProductColorData(id) {
    fetch(`/api/productcolor/get?id=${id}`).then(response => response.json()).then(data => console.log(data));
  }

  async populateColorData() {
    fetch("/api/color/get").then(response => response.json()).then(data => this.setState({color: data}));
  }

  cancelColor() {
    this.setState({cId: "", cCode: ""})
  }
}

async function deleteColor(id, isActive) {
  const action = isActive ? "khóa" : "mở khóa"
  if (confirm(`Bạn có chắc chắn ${action} bài blog này?`)) {
    const url = isActive ? `/api/productcolor/lock?id=${id}` : `/api/productcolor/unlock?id=${id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({id})
    })

    if (response.ok) { alert(`Chi tiết màu sắc đã ${action} thành công.`); location.reload(); }
    else alert(`Đã có lỗi xảy ra. Chi tiết màu sắc đã ${action} thất bại.`)
  }
}
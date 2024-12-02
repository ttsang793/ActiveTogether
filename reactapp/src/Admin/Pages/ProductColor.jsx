import React, { Component } from "react";
import PleaseWait from "/src/Shared/PleaseWait";

export default class AProductColor extends Component {
  static displayName = AProductColor.name;

  constructor(props) {
    super(props);
    this.state = { loading: true, color: [], productColor: [], cId: "", cCode: "", cCodeError: "" }
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
    if (this.state.cCode === "")
      this.setState({cCodeError: "Vui lòng chọn màu"});
    else if ((this.state.cId === "" && this.state.productColor.findIndex(pc => pc.colorCode == this.state.cCode)) || (this.state.productColor.filter(pc => pc.ProductId == this.state.cId).findIndex(pc => pc.colorCode == this.state.cCode)))
      this.setState({cCodeError: "Vui lòng chọn màu không trùng với các màu đã lưu"});
    else (this.state.cId !== "") ? this.updateProductColor() : this.addProductColor();
  }

  renderTable(colors) {
    return (
      <>
        {
          colors.map(c =>
            <tr key={c.id}>
              <td className="align-middle">
                <img src={c.productImages.length === 0 ? "/src/images/product/default.png" : c.productImages[0].image} alt={c.colorCodeNavigation.code} className="product-thumbnail" />
              </td>
              <td className="align-middle">{c.id}</td>
              <td className="align-middle">{c.colorCodeNavigation.code}</td>
              <td className="align-middle">{c.colorCodeNavigation.name}</td>
              <td className="align-middle">
                <a href={`/admin/thong-tin-mau-sac-san-pham/${c.id}`}>
                  <i className="bi bi-eye"></i>
                </a>
                <i className="bi bi-gear" onClick={() => this.setState({cId: c.id, cCode: c.colorCodeNavigation.code})}></i>
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
            <div className="mb-3">
              <label htmlFor="id">ID chi tiết:</label>
              <input id="id" type="text" value={this.state.cId} className="form-control mt-1" readOnly placeholder="ID chi tiết" />
            </div>

            <div className="mb-3">
              <label htmlFor="color">Màu sản phẩm</label>
              <select className="form-control mt-1" id="color" value={this.state.cCode} onChange={e => this.handleColorChange(e)}>
                <option value="" disabled selected hidden>Màu sản phẩm</option>
                {
                  this.state.color.map(c => <option key={c.code} value={c.code}>{c.code} - {c.name}</option>)
                }
              </select>
              <div id="color-error" className="error-value">{this.state.cCodeError}</div>
            </div>

          <input type="submit" value="Lưu" onClick={e => this.saveNewProductColor(e)} className="at-btn mt-3 me-2" />
          <input type="button" value="Hủy" onClick={() => this.cancelProductColor()} className="at-btn-secondary mt-3" />
          </div>

          <div className="col-9">            
            <table className="table table-striped table-bordered table-hover pointer">
              <thead>
                <tr>
                  <th className="text-center w-10 align-middle"></th>
                  <th className="text-center w-10 align-middle">ID</th>
                  <th className="text-center align-middle">Mã HEX</th>
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
    fetch(`/api/productcolor/get?id=${id}`).then(response => response.json()).then(data => this.setState({ loading: false, productColor: data }));
  }

  async populateColorData() {
    fetch("/api/color/get").then(response => response.json()).then(data => this.setState({ color: data }));
  }

  cancelProductColor() {
    this.setState({cId: "", cCode: "", cCodeError: ""})
  }  
  
  async addProductColor() {
    const id = Number(location.pathname.substring(location.pathname.lastIndexOf("/") + 1));
    if (confirm("Bạn có chắc chắn thêm màu cho sản phẩm này?")) {
      const response = await fetch("/api/productcolor/add", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({productId: id, colorCode: this.state.cCode})
      });
  
      if (response.ok) { alert("Thêm màu cho sản phẩm thành công"), location.reload() }
      else alert("Đã có lỗi xảy ra, thêm màu cho sản phẩm đã thêm thất bại");
    }  
  }
  
  async updateProductColor() {
    if (confirm("Bạn có chắc chắn cập nhật màu cho sản phẩm này?")) {
      const response = await fetch("/api/productcolor/update", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({id: this.state.cId, colorCode: this.state.cCode})
      });
  
      if (response.ok) { alert("Cập nhật màu sản phẩm thành công"), location.reload() }
      else alert("Đã có lỗi xảy ra, cập nhật màu sản phẩm thất bại");
    }  
  }
}

async function deleteProductColor(id, isActive) {
  const action = isActive ? "khóa" : "mở khóa"
  if (confirm(`Bạn có chắc chắn ${action} chi tiết màu sắc này?`)) {
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
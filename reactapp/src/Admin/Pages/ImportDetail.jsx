import { Component } from "react"

export default class AImportDetail extends Component {
  static displayName = AImportDetail.name;

  constructor(props) {
    super(props);
    this.state = { products: [{ sku: "", quantity: 0, price: 0 }] }
  }
  
  handleProductChange(e, index) {
    const newProduct = this.state.products.map((p, i) => {
      if (i === index) {
        if (e.target.classList.contains("sku")) p.sku = e.target.value;
        else if (e.target.classList.contains("quantity")) p.quantity = e.target.value;
        else p.price = e.target.value;
      }
      return p;
    })

    this.setState({ products: newProduct });
  }

  addProductInput() {
    const newPrice = [...this.state.products, { sku: "", quantity: 0, price: 0 }];
    this.setState({ products: newPrice });
    const i = this.state.products.length - 1;

    return (
      <div>
        <input type="text" placeholder="SKU" value={this.state.products[i].sku} onChange={e => this.handleProductChange(e, i)} className="form-control sku d-inline mb-3 me-4" style={{ width: "70px" }} />
        <input type="number" min="0" value={this.state.products[i].quantity} onChange={e => this.handleProductChange(e, i)} className="form-control quantity d-inline mb-3 me-4" style={{ width: "100px" }} />
        <input type="number" min="0" value={this.state.products[i].price} onChange={e => this.handleProductChange(e, i)} className="form-control price w-50 d-inline mb-3" style={{ width: "200px" }} />
      </div>
    )
  }

  renderProductInputs() {
    if (this.state.products.length === 0) return this.addProductInput();
    else return this.state.products.map((p, i) =>
      <div key={p.id}>
        <input type="text" placeholder="SKU" value={p.sku} onChange={e => this.handleProductChange(e, i)} className="form-control sku d-inline mb-3 me-4" style={{ width: "200px" }} />
        <input type="number" min="0" value={p.quantity} onChange={e => this.handleProductChange(e, i)} className="form-control quantity d-inline mb-3 me-4" style={{ width: "100px" }} />
        <input type="number" min="0" value={p.price} onChange={e => this.handleProductChange(e, i)} className="form-control price d-inline mb-3" style={{ width: "200px" }} />
      </div>
    )
  }

  render() {
    return (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">THÔNG TIN PHIẾU NHẬP</h1>
        <hr />

        <div className="text-end fst-italic">
          Người lập: Trần Tuấn Sang<br />
          Ngày lập: {new Date().toLocaleDateString("vi-VN")}
        </div>

        <div id="color-input">
          Danh sách sản phẩm: <button onClick={() => this.addProductInput()}>+</button>
          { this.renderProductInputs() }
        </div>

        <input type="button" value="Lưu" className="small-at-btn me-2" onClick={e => this.saveNewImport(e)} />
        <input type="button" value="Hủy" className="small-at-btn-secondary" onClick={() => location.href = "/admin/nhap-kho"} />
      </main>
    )
  }

  async saveNewImport(e) {
    e.preventDefault();
    if (confirm("Bạn có chắc chắn muốn lưu phiếu nhập? Một khi đã lưu thì không thể hủy.")) {
      let importTotal = 0;
      this.state.products.forEach(p => importTotal = importTotal + (Number(p.price) * Number(p.quantity)));
      const response = await fetch("/api/import/add", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ checkAdmin: 240523, total: importTotal, importdetails: this.state.products })
      });

      if (response.ok) { alert("Lập phiếu nhập kho thành công"), location.href = "/admin/nhap-kho" }
      else alert("Đã có lỗi xảy ra, lập phiếu nhập kho thất bại");
    }
  }
}
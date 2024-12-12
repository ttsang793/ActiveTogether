import { Component } from "react";
import { DisplayPrice } from "/src/Scripts/Utility";

export default class AImportDetail extends Component {
  static displayName = AImportDetail.name;

  constructor(props) {
    super(props);
    this.state = { products: [{ sku: "", quantity: 0, price: 0 }] }
  }

  calTotal() {
    let total = 0;
    this.state.products.forEach(p => total = total + p.price * p.quantity);
    return total;
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
        <input type="text" placeholder="SKU" value={this.state.products[i].sku} onChange={e => this.handleProductChange(e, i)} className="form-control sku d-inline" />
        <input type="number" min="0" value={this.state.products[i].quantity} onChange={e => this.handleProductChange(e, i)} className="form-control quantity d-inline" />
        <input type="number" min="0" value={this.state.products[i].price} onChange={e => this.handleProductChange(e, i)} className="form-control price w-50 d-inline" />
      </div>
    )
  }

  renderProductInputs() {
    if (this.state.products.length === 0) return this.addProductInput();
    else return this.state.products.map((p, i) =>
      <tr key={p.id}>
        <td className="align-middle">
          <input type="text" placeholder="SKU" value={p.sku} onChange={e => this.handleProductChange(e, i)} className="form-control sku d-inline" />
        </td>

        <td className="align-middle">
          <input type="number" min="0" value={p.quantity} onChange={e => this.handleProductChange(e, i)} className="form-control quantity d-inline" />
        </td>

        <td className="align-middle">
          <input type="number" min="0" value={p.price} onChange={e => this.handleProductChange(e, i)} className="form-control price d-inline" />
        </td>

        <td className="align-middle">
          {DisplayPrice(p.quantity * p.price)}
        </td>
      </tr>
    )
  }

  render() {
    return (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">THÔNG TIN PHIẾU NHẬP</h1>
        <hr />

        <button className="at-btn mb-2" onClick={() => this.addProductInput()}><i className="bi bi-plus-circle"></i> Thêm sản phẩm vào phiếu nhập</button>
        <table className="table table-hover table-striped w-100">
          <thead>
            <tr>
              <th className="w-25 text-center align-middle">SKU</th>
              <th className="w-25 text-center align-middle">Đơn giá</th>
              <th className="w-25 text-center align-middle">Số lượng</th>
              <th className="w-25 text-center align-middle">Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="fst-italic">
                Người lập: {this.props.name}<br />
                Ngày lập: {new Date().toLocaleDateString("en-CA")}
              </td>
            </tr>

            { this.renderProductInputs() }
          </tbody>

          <tfoot>
            <tr>
              <th colSpan={3} className="fst-italic text-end">TỔNG TIỀN:</th>
              <th>{DisplayPrice(this.calTotal())}</th>
            </tr>
          </tfoot>
        </table>

        <input type="button" value="Lưu" className="at-btn me-2" onClick={e => this.saveNewImport(e)} />
        <input type="button" value="Hủy" className="at-btn-secondary" onClick={() => location.href = "/admin/nhap-kho"} />
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
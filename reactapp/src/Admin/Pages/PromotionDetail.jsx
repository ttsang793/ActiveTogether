import { Component } from "react"

export default class APromotionDetail extends Component {
  static displayName = APromotionDetail.name;

  constructor(props) {
    super(props);
    this.state = { loading: true, productId: 0, products: [], saleProducts: [], id: 0, title: "", description: "", dateStart: new Date().toLocaleDateString('en-CA'), dateEnd: new Date().toLocaleDateString('en-CA') }
  }

  componentDidMount() {
    this.populateProductData();
  }

  handleSaleProducts() {
    const index = (this.state.saleProducts.length > 0) ? this.state.saleProducts.findIndex(s => s.id === this.state.productId) : -1;
    const percent = Number(document.getElementById("percent").value);
    const p = this.state.products.find(p => p.id === this.state.productId);
    var newSaleProducts;
    if (index === -1) newSaleProducts = [...this.state.saleProducts, { id: p.id, name: p.name, percent: percent / 100 }]
    else newSaleProducts = [...this.state.saleProducts.slice(0, index), { id: p.id, name: p.name, percent: percent / 100 }, ...this.state.saleProducts.slice(index + 1)];
    this.setState({ saleProducts: newSaleProducts });
    document.getElementById("percent").value = "";
  }

  handleIdChange(e) { this.setState({ productId: Number(e.target.value) }) }

  renderSaleProducts() {
    return this.state.saleProducts.map((a, i) =>
      <tr key={i}>
        <td className="align-middle">{a.id}</td>
        <td className="align-middle">{a.name}</td>
        <td className="align-middle">{Math.round(a.percent * 100)}%</td>
        <td className="align-middle">
          <button className="small-at-btn" onClick={e => this.deleteSaleProducts(e, i)}>Xóa</button>
        </td>
      </tr>
    )
  }

  deleteSaleProducts(e, i) {
    e.preventDefault();

    const newSaleProducts = [...this.state.saleProducts.slice(0, i), ...this.state.saleProducts.slice(i + 1)];
    this.setState({ saleProducts: newSaleProducts });

    this.renderSaleProducts();
  }

  render() {
    return this.state.loading ? "<p>Please wait</p>" : (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">{location.search.includes("?id=") ? "SỬA" : "THÊM"} CHƯƠNG TRÌNH KHUYẾN MÃI</h1>
        <hr />

        <input type="text" className="form-control mb-2" value={this.state.id} readOnly placeholder="Mã chương trình" />
        <input type="text" className="form-control mb-2" onChange={e => this.setState({ title: e.target.value })} value={this.state.title} placeholder="Tên chương trình" autoFocus />
        <textarea className="form-control mb-2" value={this.state.description} onChange={e => this.setState({ description: e.target.value })}></textarea>
        <input type="date" className="form-control mb-2" onChange={e => this.setState({ dateStart: e.target.value })} value={this.state.dateStart} />
        <input type="date" className="form-control mb-2" onChange={e => this.setState({ dateEnd: e.target.value })} value={this.state.dateEnd} />

        <hr />
        Danh sách sản phẩm:
        <div className="d-flex c-10">
          <select id="product-list" className="form-control" defaultValue={this.state.productId} onChange={e => this.handleIdChange(e)}>
            {
              this.state.products.map(p => (<option key={p.id} value={p.id}>{p.id} - {p.name}</option>))
            }
          </select>
          <input className="form-control" id="percent" type="number" min="5" max="95" placeholder="5 - 95%" style={{ width: "130px" }} />
          <button className="small-at-btn" onClick={() => this.handleSaleProducts()}>Thêm</button>
        </div>
        <table className="table table-hover table-striped w-100 mt-2">
          <thead className="text-center">
            <tr>
              <th className="w-10">Mã SP</th>
              <th>Tên sản phẩm</th>
              <th className="w-25">Giảm giá</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.renderSaleProducts()}
          </tbody>
        </table>

        <input type="button" value="Lưu" className="small-at-btn me-2" onClick={e => this.addPromotion(e)} />
        <input type="button" value="Hủy" className="small-at-btn-secondary" onClick={() => location.href = "/admin/giam-gia"} />
      </main>
    )
  }

  async populateProductData() {
    fetch("/api/product/get").then(response => response.json()).then(data => this.setState({ loading: false, products: data, productId: data[0].id }));
  }

  async addPromotion(e) {
    e.preventDefault();
    if (confirm("Bạn có chắc chắn thêm chương trình khuyến mãi này?")) {
      const promotionDetails = [];
      this.state.saleProducts.forEach(s => promotionDetails.push({ productId: s.id, percent: s.percent }));

      console.log( promotionDetails);
      const response = await fetch("/api/promotion/add", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          title: this.state.title,
          description: this.state.description,
          dateStart: this.state.dateStart,
          dateEnd: this.state.dateEnd,
          promotionDetails
        })
      });
  
      if (response.ok) { alert("Chương trình khuyến mãi đã thêm thành công. Lưu ý là chỉ có thể sửa chương trình khi chương trình chưa bắt đầu")/*, location.href = "/admin/giam-gia"*/ }
      else alert("Đã có lỗi xảy ra, chương trình khuyến mãi đã thêm thất bại");
    }  
  }
}
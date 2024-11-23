import "./Product.css"
import { Component } from "react";

export default class AProduct extends Component {
  static displayName = AProduct.name;

  constructor(props) {
    super(props);
    this.state = { loading: true, product: [] }
  }

  componentDidMount = () => this.populateProductData();

  renderTable(products) {
    return (
      <>
        {
          products.map(p =>
            <tr key={p.id}>
              <td className="align-middle">
              <img src={p.image} alt={p.name} className="product-thumbnail" />
              </td>
              <td className="align-middle">{p.id}</td>
              <td className="align-middle">{p.name}</td>
              <td className="align-middle">
                <button className="small-at-btn me-1">Xem</button>
                <a href={`/admin/thong-tin-san-pham?id=${p.id}`}>
                  <button className="small-at-btn me-1">Sửa</button>
                </a>
                <button className="small-at-btn" onClick={() => deleteProduct(p.id, p.isActive)}>{p.isActive ? "Khóa" : "Mở khóa"}</button>
              </td>
            </tr>
          )
        }
      </>
    )
  }
  
  render() {
    return this.state.loading ? "Please wait..." : (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">SẢN PHẨM</h1>
        <hr />
        
        <div className="text-end">
          <a href="/admin/thong-tin-san-pham">
            <button className="at-btn">Thêm</button>
          </a>
        </div>

        <table className="table table-striped table-bordered table-hover mt-3">
          <thead>
            <tr>
              <th className="text-center w-10"></th>
              <th className="text-center w-10">ID</th>
              <th className="text-center">Tên sản phẩm</th>
              <th className="button-col"></th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {this.renderTable(this.state.product)}
          </tbody>
        </table>
      </main>
    )
  }

  async populateProductData() {
    fetch("/api/product/get").then(response => response.json()).then(data => this.setState({ loading: false, product: data }));
  }
}

async function deleteProduct(id, isActive) {
  const action = isActive ? "khóa" : "mở khóa"
  if (confirm(`Bạn có chắc chắn ${action} sản phẩm này?`)) {
    const url = isActive ? `/api/product/lock?id=${id}` : `/api/product/unlock?id=${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({id})
    })

    if (response.ok) { alert(`Sản phẩm đã ${action} thành công.`); location.reload(); }
    else alert(`Đã có lỗi xảy ra. Sản phẩm đã ${action} thất bại.`)
  }
}
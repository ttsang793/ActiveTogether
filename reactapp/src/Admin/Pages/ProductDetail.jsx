import "./Product.css"
import { Component } from "react";
import PleaseWait from "/src/Shared/PleaseWait"

export default class AProductDetail extends Component {
  static displayName = AProductDetail.name;

  constructor(props) {
    super(props);
    this.state = { loading: true, pSKU: "", pSize: "", pPrice: "", pNote: "", pImage: [], image: [], detail: [] }
  }

  componentDidMount = () => {
    const id = Number(location.pathname.substring(location.pathname.lastIndexOf("/") + 1));
    this.populateProductDetailData(id);
  }

  renderTable(products) {
    return (
      <>
        {
          products.map(p =>
            <tr key={p.sku}>
              <td className="align-middle">{p.sku}</td>
              <td className="align-middle">{p.size}</td>
              <td className="align-middle">{p.price}</td>
              <td className="align-middle">
                <i className="bi bi-gear" onClick={() => this.setState({ pSKU: p.sku, pSize: p.size, pPrice: p.price, pNote: p.note })}></i>
                <i className={`bi bi-${p.isActive ? "lock" : "unlock"}`} onClick={() => deleteProductDetail(p.id, p.isActive)}></i>
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
        <h1 className="flex-grow-1 text-center fw-bold">CHI TIẾT MÀU SẮC SẢN PHẨM</h1>
        <hr />

        <div className="row">
          <div className="col-3">
            <input type="text" value={this.state.pSKU} className="form-control" readOnly placeholder="Mã SKU" />
            <input type="text" onChange={e => this.setState({ pSize: e.target.value })} value={this.state.pSize} className="form-control mt-3" placeholder="Kích thước" />
            <input type="number" onChange={e => this.setState({ pPrice: e.target.value })} value={this.state.pPrice} className="form-control mt-3" placeholder="Đơn giá" />
            <textarea placeholder="Mô tả" className="form-control mt-3" style={{ height: "100px" }} onChange={(e) => this.setState({ pNote: e.target.value })} value={this.state.pNote}></textarea>

            <input type="submit" value="Lưu" onClick={e => this.saveNewProductDetail(e)} className="at-btn mt-3 me-2" />
            <input type="button" value="Hủy" onClick={() => this.cancelProductDetail()} className="at-btn-secondary mt-3" />
          </div>

          <div className="col-9">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th className="text-center">SKU</th>
                  <th className="text-center">Kích thước</th>
                  <th className="text-center">Đơn giá</th>
                  <th></th>
                </tr>
              </thead>

              <tbody className="table-group-divider">
                {this.renderTable(this.state.detail)}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    )
  }

  async populateProductDetailData(id) {
    fetch(`/api/productdetail/get?id=${id}`).then(response => response.json()).then(data => this.setState({ detail: data, loading: false }, () => console.log(data)));
  }

  cancelProductDetail() {
    this.state = { pSKU: "", pSize: "", pPrice: "", pNote: "", pImage: [] }
  }
}

async function deleteProductDetail(id, isActive) {
  const action = isActive ? "khóa" : "mở khóa"
  if (confirm(`Bạn có chắc chắn ${action} chi tiết sản phẩm này?`)) {
    const url = isActive ? `/api/productdetail/lock?id=${id}` : `/api/productdetail/unlock?id=${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ id })
    })

    if (response.ok) { alert(`Chi tiết sản phẩm đã ${action} thành công.`); location.reload(); }
    else alert(`Đã có lỗi xảy ra. Chi tiết sản phẩm đã ${action} thất bại.`)
  }
}
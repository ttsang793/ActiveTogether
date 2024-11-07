import "./Cart.css";
import { DisplayPrice } from "/src/Components/Utility.js"
import { Component } from "react";

export default class Cart extends Component {
  static displayName = Cart.name;

  constructor(props) {
    super(props);
    this.state = { products: [], total: 0 }
  }

  componentDidMount() {
    this.populateCartList();
  }

  checkAll(checkbox) {
    document.querySelectorAll(".item-checkbox").forEach(c => c.checked = checkbox.checked);
    this.calTotal();
  }

  calTotal() {
    let total = 0
    document.querySelectorAll(".item-checkbox").forEach((c,i) => {
      if (c.checked) total += this.state.products[i].price;
    })
    this.setState({total: total});
  }

  handleQuantity(e, i) {
    this.state.products[i].quantity = e.target.value;
    const product = [...this.state.products];
    this.setState({products: product})
  }

  renderItemRow(i) {
    return (
      <tr key={i}>
        <td><input type="checkbox" className="item-checkbox" id={`item-${i}`} onChange={() => this.calTotal()} /></td>
        <td><img src={this.state.products[i].image} alt={this.state.products[i].name} width="80%" /></td>
        <td>
          <b className="fs-4">{this.state.products[i].name}</b><br />
          <i>({this.state.products[i].color} {this.state.products[i].size})</i>

        </td>
        <td><input type="text" value={this.state.products[i].quantity} onChange={e => this.handleQuantity(e, i)} className="item-quantity" /></td>
        <td>{DisplayPrice(this.state.products[i].price)}</td>
        <td>
          <button className="btn btn-warning" onClick={() => updateCart(this.state.products[i])}>Sửa</button>
          <button className="btn btn-danger" onClick={() => deleteCart(this.state.products[i].sku)}>Xóa</button>
        </td>
      </tr>
  )}
  
  renderCartList() {
    return (
      <main>    
        <h1 className="flex-grow-1 text-center fw-bold">GIỎ HÀNG</h1>
        <hr />
  
        <table className="text-center table table-bordered cart-table">
          <thead>
            <tr>
              <th width="3%"><input type="checkbox" onClick={e => this.checkAll(e.target)} /></th>
              <th width="10%">Hình ảnh</th>
              <th width="55%">Tên sản phẩm</th>
              <th width="10%">Số lượng</th>
              <th width="15%">Giá</th>
              <th width="7%"></th>
            </tr>
          </thead>
  
          <tbody>
            { this.state.products.map((_, i) => this.renderItemRow(i)) }
            <tr>
              <td colSpan={4}>TỔNG</td>
              <td colSpan={2}>{DisplayPrice(this.state.total)}</td>
            </tr>
          </tbody>
        </table>
  
        <div className="text-center">
          <input type="button" value="Thanh toán" className="btn btn-success mx-1" onClick={() => this.addOrder()} />
          <input type="button" value="Xóa giỏ hàng" className="btn btn-danger mx-1" onClick={() => deleteAll(1)} />
        </div>
      </main>
    )
  }

  render() {
    return this.state.products.length === 0 ? "Giỏ hàng đang trống" : this.renderCartList();
  }

  async populateCartList() {
    fetch("/cart?id=1").then(response => response.json()).then(data => this.setState({ products: data }));
  }
  
  async addOrder() {
    const orderProducts = [];  
    this.state.products.forEach((p, i) => {
      if (document.getElementById(`item-${i}`).checked)
        orderProducts.push({
          sku: p.sku,
          price: p.price,
          quantity: p.quantity
        })
    })

    if (orderProducts.length === 0) alert("Vui lòng chọn sản phẩm");
    else if (confirm("Bạn có chắc chắn thanh toán cho các sản phẩm bạn đã chọn?")) {
      const response = await fetch("/order/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          userId: 1,
          total: this.state.total,
          orderDetails: orderProducts
        })
      })
    
      if (response.ok) { alert("Đặt hàng thành công!"); location.reload(); }
      else alert("Đã có lỗi xảy ra, đặt hàng thất bại.");
    }
  }
}

async function updateCart(product) {
  const response = await fetch(`/cart/update?userId=1&sku=${product.sku}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      userId: 1,
      sku: product.sku,
      price: product.price,
      quantity: product.quantity
    })
  })

  if (response.ok) { alert("Cập nhật thông tin sản phẩm thành công!"); location.reload(); }
  else alert("Đã có lỗi xảy ra, cập nhật thông tin sản phẩm thất bại.");
}

async function deleteCart(sku) {
  const response = await fetch(`/cart/delete?userId=1&sku=${sku}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      userId: 1,
      sku: sku
    })
  })

  if (response.ok) { alert("Xóa sản phẩm ra khỏi giỏ hàng thành công!"); location.reload(); }
  else alert("Đã có lỗi xảy ra, xóa sản phẩm ra khỏi giỏ hàng thất bại.");
}

async function deleteAll(id) {
  const response = await fetch(`/cart/delete?id=${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      userId: 1
    })
  })

  if (response.ok) alert("Xóa giỏ hàng thành công!");
  else alert("Đã có lỗi xảy ra, xóa giỏ hàng thất bại.");
}
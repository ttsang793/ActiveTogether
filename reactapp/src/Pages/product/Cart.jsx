import "./Cart.css";
import CartEmpty from "/src/Components/product/CartEmpty"
import { DisplayPrice, DisplayConfig } from "/src/Scripts/Utility.js"
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

  handleCheck() {
    let checkAll = true, total = 0;
    for (let i=0; i<document.querySelectorAll(".item-checkbox").length; i++) {
      const c = document.querySelectorAll(".item-checkbox")[i];
      if (!c.checked) checkAll = false;
      else total = total + this.state.products[i].price * this.state.products[i].quantity;
    }

    document.getElementById("checkall").checked = checkAll;
    this.setState({total: total});
  }

  checkAll(checkbox) {
    let total = 0
    document.querySelectorAll(".item-checkbox").forEach((c, i) => {
      if (checkbox.checked) total += this.state.products[i].price * this.state.products[i].quantity;
      c.checked = checkbox.checked
    });
    this.setState({total: total});
  }

  handleQuantity(i, quantity) {
    if (quantity >= 1) {
      this.state.products[i].quantity = quantity;
      const product = [...this.state.products];
      this.setState({products: product});
      this.updateCart(this.state.products[i])
    }
  }

  deleteProduct(i) {
    const newProduct = [...this.state.products.slice(0, i), ...this.state.products.slice(i + 1)];
    this.setState({ products: newProduct });
  }

  renderItemRow(i) {
    return (
      <tr key={i}>
        <td><input type="checkbox" className="item-checkbox" id={`item-${i}`} onChange={() => this.handleCheck()} /></td>
        <td><img src={this.state.products[i].image} alt={this.state.products[i].name} className="w-100" /></td>
        <td className="item-detail">
          <b className="fs-5">{this.state.products[i].name}</b>
          <i>{DisplayConfig(this.state.products[i].color, this.state.products[i].size)}</i>
          
          <div className="item-quantity">
            Số lượng:&nbsp;

            <div className="d-flex">
              <button className="minus ms-2" onClick={() => this.handleQuantity(i, this.state.products[i].quantity - 1)}>&minus;</button>
              <input type="text" value={this.state.products[i].quantity} className="text-center quantity" readOnly />
              <button className="plus" onClick={() => this.handleQuantity(i, this.state.products[i].quantity + 1)}>+</button>
            </div>
          </div>

          <div>
            Thành tiền: {DisplayPrice(this.state.products[i].price * this.state.products[i].quantity)}
          </div>
        </td>
        <td>
          <i className="bi bi-x" onClick={() => this.deleteCart(i, this.state.products[i].sku)}></i>
        </td>
      </tr>
  )}
  
  renderCartList() {    
    return (
      <main className="user-main">    
        <h1 className="flex-grow-1 text-center fw-bold">GIỎ HÀNG</h1>
        <hr />

        <table className="table table-bordered cart-table">
          <thead className="text-center">
            <tr>
              <th><input type="checkbox" id="checkall" onClick={e => this.checkAll(e.target)} /></th>
              <th className="item-thumbnail">Hình ảnh</th>
              <th>Sản phẩm</th>
              <th className="w-10"></th>
            </tr>
          </thead>
  
          <tbody>
            { this.state.products.map((_, i) => this.renderItemRow(i)) }
            <tr>
              <td className="fw-bold text-end fs-5" colSpan={2}>TỔNG</td>
              <td className="fw-bold fs-5" colSpan={2}>{DisplayPrice(this.state.total)}</td>
            </tr>
          </tbody>
        </table>
  
        <div className="text-center">
          <button className="btn btn-success mx-1" onClick={() => this.redirectToOrder()}>
            <i className="bi bi-cart-check-fill"></i> Thanh toán
          </button>

          <button className="btn btn-danger mx-1" onClick={() => this.deleteAll(1)}>
            <i className="bi bi-trash3-fill"></i> Xóa giỏ hàng
          </button>
        </div>
      </main>
    )
  }

  render() {
    return this.state.products.length === 0 ? <CartEmpty />: this.renderCartList();
  }

  redirectToOrder() {
    const orderProducts = [];  
    this.state.products.forEach((p, i) => {
      if (document.getElementById(`item-${i}`).checked)
        orderProducts.push(p)
    })

    if (orderProducts.length === 0) alert("Vui lòng chọn sản phẩm");
    else {
      localStorage.setItem("payItem", JSON.stringify({orderProducts}))
      location.href = "/thanh-toan"
    }
  }

  async populateCartList() {
    const username = localStorage.getItem("userLogin")
    if (username !== null)
    fetch(`/cart/get?username=${username}`).then(response => response.json()).then(data => this.setState({ products: data }));
  }

  async updateCart(product) {
    const username = localStorage.getItem("userLogin");

    if (username !== null) {
      fetch(`/cart/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          sku: product.sku,
          price: product.price,
          quantity: product.quantity
        })
      })
    }
  }

  async deleteCart(i, sku) {
    const username = localStorage.getItem("userLogin");

    if (username !== null) {
      if (confirm("Bạn có muốn đưa sản phẩm này ra khỏi giỏ hàng?")) {
        const response = await fetch(`/cart/delete?username=${username}&sku=${sku}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            userId: 1,
            sku: sku
          })
        })

        if (response.ok) {
          alert("Xóa sản phẩm ra khỏi giỏ hàng thành công!");
          this.deleteProduct(i);
        }
        else alert("Đã có lỗi xảy ra, xóa sản phẩm ra khỏi giỏ hàng thất bại.");
      }
    }
  }

  async deleteAll() {
    const username = localStorage.getItem("userLogin");

    if (username !== null) {
      if (confirm("Bạn có muốn xóa TOÀN BỘ sản phẩm trong giỏ hàng?")) {
        const response = await fetch(`/cart/deleteAll?username=${username}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            userId: 1
          })
        })

        if (response.ok) {
          alert("Xóa giỏ hàng thành công!");
          this.setState({products: []})
        }
        else alert("Đã có lỗi xảy ra, xóa giỏ hàng thất bại.");
      }
    }
  }
}


import { DisplayPrice, DisplayDate } from "/src/Components/Utility"
import { Component } from "react"
import "./OrdersHistory.css";
import OrderRow from "/src/Components/OrderRow";

export default class OrdersHistory extends Component {
  constructor(props) {
    super(props);
    this.state = { orders: [], orderDetails: [] }
  }

  componentDidMount() {
    this.fetchOrderDetails();
  }

  handleTidy(e, id) {
    e.preventDefault();
    console.log(e);
    if (e.target.classList.contains("tidy")) {
      document.querySelectorAll(`.order-${id}`).forEach(o => o.classList.remove("disabled"))
      e.target.classList.remove("tidy")
    }
    else {
      document.querySelectorAll(`.order-${id}`).forEach(o => o.classList.add("disabled"))
      e.target.classList.add("tidy")
    }
  }

  renderOrderList() {
    return (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">ĐƠN HÀNG CỦA BẠN</h1>
        <hr />

        <table className="text-center table table-bordered cart-table table-hover">
          <thead>
            <tr>
              <th width="10%">Hình ảnh</th>
              <th width="53%">Tên sản phẩm</th>
              <th width="10%">Số lượng</th>
              <th width="15%">Giá</th>
              <th width="12%"></th>
            </tr>
          </thead>

          <tbody>
            {
              this.state.orders.map(or => {
                return (
                  <React.Fragment key={or.id}>
                    <tr className="header-order pointer" onClick={e => this.handleTidy(e, or.id)}>
                      <td colSpan={3}>ĐƠN HÀNG {or.id} - {DisplayDate(or.datePurchased)} (Trạng thái: {or.status})</td>
                      <td>{DisplayPrice(or.total)}</td>
                      <td>
                        { or.status === 0 && <button className="btn btn-danger" onClick={() => this.cancelOrder(or.id)}>Hủy đơn hàng</button> }
                        { or.status === 2 && <button className="btn btn-success" onClick={() => this.receiveOrder(or.id)}>Đã nhận hàng</button> }
                      </td>
                    </tr>
                    {
                      this.state.orderDetails.filter(od => od.orderId === or.id).map((od, i) => <OrderRow order={or} orderDetail={od} key={i} />)
                    }
                  </React.Fragment>
                )
              })
            }
          </tbody>
        </table>
      </main>
    )
  }

  render() {
    return (
      <>
        {this.renderOrderList()}
      </>
    )
  }

  async fetchOrderDetails() {
    const username = localStorage.getItem("userLogin");
    fetch(`/order/get?username=${username}`).then(response => response.json()).then(data => {
      this.setState({ orders: data });
    })


    fetch(`/order/getDetails?username=${username}`).then(response => response.json()).then(data => {
      this.setState({ orderDetails: data });
    })
  }

  async cancelOrder(id) {
    if (confirm("Bạn có chắc chắn muốn hủy đơn hàng này? Một khi hủy thì không thể phục hồi.")) {
      const response = await fetch(`/order/cancel?id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({id})
      })

      if (response.ok) { alert("Hủy đơn hàng thành công!"); location.reload(); }
      else alert("Đã có lỗi xảy ra, hủy đơn hàng thất bại.");
    }
  }

  async receiveOrder(id) {
    if (confirm("Bạn chắc chắn đã nhận các sản phẩm đơn hàng này?")) {
      const response = await fetch(`/order/receive?id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({id})
      })

      if (response.ok) { alert("Xác nhận nhận hàng thành công!"); location.reload(); }
      else alert("Đã có lỗi xảy ra, xác nhận nhận hàng thất bại.");
    }
  }
}
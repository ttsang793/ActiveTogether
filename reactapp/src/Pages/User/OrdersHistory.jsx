import { DisplayPrice, DisplayDate } from "/src/Scripts/Utility"
import { Component } from "react"
import "./OrdersHistory.css";
import OrderRow from "/src/Components/product/OrderRow";
import PleaseWait from "/src/Shared/PleaseWait";

export default class OrdersHistory extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, orders: [], orderDetails: [] }
  }

  componentDidMount() {
    this.fetchOrderDetails();
  }

  handleTidy(e, id) {
    e.preventDefault();
    if (e.target.classList.contains("tidy")) {
      document.querySelectorAll(`.order-${id}`).forEach(o => o.classList.remove("disabled"))
      e.target.classList.remove("tidy")
    }
    else {
      document.querySelectorAll(`.order-${id}`).forEach(o => o.classList.add("disabled"))
      e.target.classList.add("tidy")
    }
  }

  displayStatus(status) {
    switch (status) {
      case -1: case '-1': return "Đã hủy đơn"
      case 0: case '0': return "Chưa xác thực"
      case 1: case '1': return "Đã xác thực"
      case 2: case '2': return "Đang vận chuyển"
      case 3: case '3': return "Đã giao hàng"
      case 4: case '4': return "Đã nhận hàng"
    }
  }

  renderOrderList() {
    return (
      <main className="user-main">
        <h1 className="text-center fw-bold">ĐƠN HÀNG CỦA BẠN</h1>
        <hr />

        <table className="table table-bordered cart-table table-hover">
          <tbody>
            {
              this.state.orders.map(or => {
                return (
                  <React.Fragment key={or.id}>
                    <tr className="header-order pointer" onClick={e => this.handleTidy(e, or.id)}>
                      <td>ĐƠN HÀNG {or.id} - {DisplayDate(or.datePurchased)} (Trạng thái: {this.displayStatus(or.status)})</td>
                      <td className="text-center">{DisplayPrice(or.total)}</td>
                      <td className="return-btn-group">
                        { (or.status === 0 || or.status === 1) && <button className="btn btn-danger" onClick={() => this.cancelOrder(or.id)}>Hủy đơn</button> }
                        { or.status === 3 && <button className="btn btn-success" onClick={() => this.receiveOrder(or.id)}>Nhận hàng</button> }
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
    return this.state.loading ? <PleaseWait /> : this.renderOrderList();
  }

  async fetchOrderDetails() {
    const username = localStorage.getItem("userLogin");
    fetch(`/order/get?username=${username}`).then(response => response.json()).then(data => {
      this.setState({ orders: data });
    })


    fetch(`/order/getDetails?username=${username}`).then(response => response.json()).then(data => {
      this.setState({ loading: false, orderDetails: data });
    })
  }

  async cancelOrder(id) {
    if (confirm("Bạn có chắc chắn muốn hủy đơn hàng này? Một khi hủy thì không thể phục hồi.")) {
      const response = await fetch(`/order/cancel?id=${id}`, {
        method: 'PUT',
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
        method: 'PUT',
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
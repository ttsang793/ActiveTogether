import { Component } from "react";
import OrderRow from "./OrderRow";

export default class AOrder extends Component {
  static displayName = AOrder.name;

  constructor(props) {
    super(props);
    this.state = { order: [], orderDetail: [] }
  }

  componentDidMount = () => this.populateOrderData();
  
  render() {
    return (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">DANH SÁCH HÓA ĐƠN</h1>
        <hr />

        <table className="table table-striped table-bordered table-hover mt-3">
          <thead>
            <tr>
              <th className="text-center align-middle">ID</th>
              <th className="text-center align-middle">Ngày đặt hàng</th>
              <th className="text-center align-middle">Ngày xác nhận</th>
              <th className="text-center align-middle">Ngày nhận hàng</th>
              <th className="text-center align-middle">Trạng thái</th>
              <th className="text-center align-middle">Tổng</th>
              <th className="button-col"></th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {
              this.state.order.map(o => <OrderRow order={o} orderDetail={this.state.orderDetail.filter(od => od.billId === o.id)} key={o.id} />)
            }
          </tbody>
        </table>
      </main>
    )
  }

  async populateOrderData() {
    fetch("/api/order/get").then(response => response.json()).then(data => this.setState({order: data}));
    fetch("/api/order/getDetail").then(response => response.json()).then(data => this.setState({orderDetail: data}));
  }
}
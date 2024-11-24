import { Component } from 'react'
import { DisplayConfig } from '/src/Scripts/Utility'

export default class ARefund extends Component {
  static DisplayName = ARefund.name;

  constructor(props) {
    super(props);
    this.state = { loading: true, refunds: [] }
  }

  componentDidMount() {
    this.populateRefundData();
  }

  async populateRefundData() {
    fetch("/api/refund/get").then(reponse => reponse.json()).then(data => {
      this.setState({ loading: false, refunds: data })
    })
  }

  renderTable(refunds) {
    return refunds.map((r, i) => 
      <tr key={i}>
        <td className='align-middle'>{r.id}</td>
        <td className='align-middle'>{r.orderId}</td>
        <td className='align-middle'>{r.sku}</td>
        <td className='align-middle'>
          {r.name} <br />
          {DisplayConfig(r.color, r.size)}
        </td>
        <td className='align-middle'>{r.quantity}</td>
        <td className='align-middle'>{r.reason}</td>
        <td className='align-middle'>
          <select defaultValue={r.status} onChange={e => this.handleStatus(e, i)}>
            <option value="-1">Không giải quyết</option>
            <option value="0">Yêu cầu</option>
            <option value="1">Hoàn trả</option>
            <option value="2">Đổi sản phẩm</option>
          </select>
        </td>
        <td className='align-middle'>
          <button className="small-at-btn me-1" onClick={e => this.updateStatus(e, r)}>Lưu</button>
        </td>
      </tr>
    )
  }

  render() {
    return this.state.loading ? "Please wait..." : (
      <main>
        <h1 className="flex-grow-1 text-center fw-bold">ĐƠN HOÀN TRẢ</h1>
        <hr />

        <table className="table table-striped table-bordered table-hover mt-3">
          <thead>
            <tr>
              <th className="text-center">ID</th>
              <th className="text-center">Mã HĐ</th>
              <th className="text-center">Mã SKU</th>
              <th className="text-center">Thông tin sản phẩm</th>
              <th className="text-center">SL</th>
              <th className="text-center">Lý do đổi trả</th>
              <th className="text-center">Tình trạng</th>
              <th className="button-col w-10"></th>
            </tr>
          </thead>

          <tbody className="table-group-divider">
            {this.renderTable(this.state.refunds)}
          </tbody>
        </table>
      </main>
    )
  }

  handleStatus(e, i) {
    e.preventDefault();
    const newRefund = this.state.refunds[i];
    newRefund.status = e.target.value;
    
    this.setState({refunds: [...this.state.refunds.slice(0, i), newRefund, ...this.state.refunds.slice(i+1)]});
  }

  async updateStatus(e, refund) {
    e.preventDefault();
    if (confirm("Bạn có chắc chắn hoàn thành xử lý trả hàng cho khách?")) {
      let updateQuantity = false;
      if (refund.status > 0) {
        if (confirm("Bạn có muốn cập nhật số lượng sản phẩm?")) updateQuantity = true;
      }
      
      const response = await fetch(`/api/refund/changeStatus?updateQuantity=${updateQuantity}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          id: refund.id,
          orderId: refund.orderId,
          orderDetailId: refund.orderDetailId,
          sku: refund.sku,
          price: refund.price,
          quantity: refund.quantity,
          status: refund.status,
          vertifyAdmin: 240523
        })
      })
  
      if (response.ok) { alert("Trả hàng thành công"); location.reload(); }
      else alert("Đã có lỗi xảy ra, trả hàng thất bại");
    }
  }
}
import { useState } from "react";
import { DisplayPrice, DisplayDate, DisplayConfig } from "/src/Scripts/Utility";
import Modal from 'react-bootstrap/Modal';

export default function OrderRow(props) {
  const [status, setStatus] = useState(props.order.status);
  const [show, setShow] = useState(false);
  const handleStatusChange = e => setStatus(e.target.value)
  const handleHide = () => setShow(false);
  const handleShow = () => setShow(true)

  function renderModal(order, orderDetail) {
    return (
      <Modal show={show} onHide={handleHide} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Hóa đơn khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <div className="nb-2">
            <b>NV xác nhận:</b> {order.vertifyAdmin === null ? "Chưa có" : `${order.vertifyAdmin} - ${order.vertifyAdminName}`} <br />
            <b>Ngày lập:</b> {DisplayDate(order.datePurchased)}<br />
          </div>
          <b><i>Danh sách hàng hóa:</i></b>
          {
            (orderDetail.length === 0) ? "Đơn hàng không có sản phẩm" :
              <table className="table table-striped table-bordered table-hover mt-3">
                <thead>
                  <tr>
                    <th className="text-center">SKU</th>
                    <th className="text-center">Tên sản phẩm</th>
                    <th className="text-center">Thông số</th>
                    <th className="text-center">Giá tiền</th>
                    <th className="text-center">Số lượng</th>
                  </tr>
                </thead>
      
                <tbody className="table-group-divider">
                  {orderDetail.map(o =>
                    <tr key={o.sku}>
                      <td className="align-middle">{o.sku}</td>
                      <td className="align-middle">{o.name}</td>
                      <td className="align-middle">{DisplayConfig(o.color, o.size)}</td>
                      <td className="align-middle">{DisplayPrice(o.price)}</td>
                      <td className="align-middle">{o.quantity}</td>
                    </tr>
                  )}
                </tbody>
              </table>
          }
        </Modal.Body>
      </Modal>
    )
  }

  return (
    <>
      <tr>
        <td className="align-middle">{props.order.id}</td>
        <td className="align-middle">{DisplayDate(props.order.datePurchased)}</td>
        <td className="align-middle">{props.order.dateVertified === null ? "-" : DisplayDate(props.order.dateVertified)}</td>
        <td className="align-middle">{props.order.dateReceived === null ? "-" : DisplayDate(props.order.dateReceived)}</td>
        <td className="align-middle">
          <select value={status} onChange={handleStatusChange}>
            <option value="0" disabled={ props.order.status > 0 || props.order.status === -1 }>Đã đặt hàng</option>
            <option value="1" disabled={ props.order.status > 1 || props.order.status === -1 }>Đã xác nhận</option>
            <option value="2" disabled={ props.order.status > 2 || props.order.status === -1 }>Đang vận chuyển</option>
            <option value="3" disabled={ props.order.status > 3 || props.order.status === -1 }>Đã giao hàng</option>
            <option value="4" disabled>Đã nhận hàng</option>
            <option value="-1" disabled>Đã hủy</option>
          </select>
        </td>
        <td className="align-middle">{DisplayPrice(props.order.total)}</td>
        <td>
          <button className={`small-at-btn me-1 ${ props.order.status < 0 || props.order.status > 2 ? "disabled" : "" }`} onClick={() => updateOrder(props.order.id, status)}>Lưu</button>
          <button className="small-at-btn me-1" onClick={handleShow}>Xem đơn</button>          
        </td>
      </tr>
      {renderModal(props.order, props.orderDetail)}
    </>
  )
}

async function updateOrder(id, status) {
  if (confirm(`Bạn có chắc chắn cập nhật tình trạng đơn hàng này?`)) {
    const response = await fetch("/api/order/changeStatus", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({id, vertifyAdmin: 240523, status})
    })

    if (response.ok) { alert("Cập nhật tình trạng đơn hàng thành công"); location.reload(); }
    else alert("Đã có lỗi xảy ra, cập nhật tình trạng đơn hàng thất bại");
  }
}
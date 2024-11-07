import { React, useState } from "react";
import { DisplayPrice, DisplayDate } from "/src/Components/Utility"
import Modal from 'react-bootstrap/Modal';

export default function OrderRow(props) {  
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [reason, setReason] = useState("");
  const handleHide = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleReason = e => setReason(e.target.value);
  const handleQuantity = e => setQuantity(e.target.value);

  function renderModal(orderDetailId) {  
    return (
      <Modal show={show} onHide={handleHide} animation={false} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Đơn đề nghị đổi trả hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input className="form-control" type="number" placeholder="Nhập số lượng hàng cần trả" value={quantity} onChange={handleQuantity} required />
            <textarea className="form-control" value={reason} onChange={handleReason} placeholder="Lý do hủy" required></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="small-at-btn" onClick={() => requestRefund(orderDetailId, quantity, reason)}>Đề xuất</button>
          <button className="small-at-btn-secondary" onClick={handleHide}>Hủy</button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <>
      <tr className={`order-${props.order.id}`}>
        <td><img src={props.orderDetail.image} alt={props.orderDetail.name} width="80%" /></td>
        <td>
          <b className="fs-4">{props.orderDetail.name}</b><br />
          <i>({props.orderDetail.color} {props.orderDetail.size})</i>

        </td>
        <td><input type="text" value={props.orderDetail.quantity} readOnly className="item-quantity" /></td>
        <td>{DisplayPrice(props.orderDetail.price)}</td>
        <td>
          { props.order.status === 3 && props.orderDetail.refundStatus === null && <button className="btn btn-danger" onClick={handleShow}>Hoàn trả</button> }
        </td>
      </tr>
      { renderModal(props.orderDetail.id) }
    </>
  )
}

async function requestRefund(orderDetailId, quantity, reason) {
  if (confirm(`Bạn có chắc chắn cập nhật tình trạng đơn hàng này?`)) {
    const response = await fetch("/refund/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({orderDetailId, quantity, reason})
    })

    if (response.ok) { alert("Đơn của bạn đã được đưa cho admin, bạn vui lòng chờ tí xíu nhé!"); location.reload(); }
    else alert("Đã có lỗi xảy ra, đơn của bạn chưa được đưa cho admin, bạn vui lòng thử lại nhé!");
  }
}
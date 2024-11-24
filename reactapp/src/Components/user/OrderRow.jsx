import { React, useState } from "react";
import { DisplayPrice, DisplayConfig } from "/src/Scripts/Utility"
import Modal from 'react-bootstrap/Modal';
import "./OrderRow.css";

export default function OrderRow(props) {  
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("");
  const handleHide = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleReason = e => setReason(e.target.value);
  const handleQuantity = e => setQuantity(e.target.value);

  function renderModal(orderDetailId) {  
    return (
      <Modal show={show} onHide={handleHide} animation={false} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title><b>Đơn đề nghị đổi trả hàng</b></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <i><b>Số lượng:</b></i>
            <input className="form-control my-2" type="number" min="1" max={props.orderDetail.quantity} placeholder="Nhập số lượng hàng cần trả" value={quantity} onChange={handleQuantity} required />
            <i><b>Lý do:</b></i>
            <textarea className="form-control mt-2" value={reason} onChange={handleReason} style={{height: "40vh"}} placeholder="Bạn hãy cho Active Together biết lý do trả hàng nhé!" required></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="small-at-btn" onClick={() => requestRefund(orderDetailId, props.orderDetail.price, quantity, reason)}>Đề xuất</button>
          <button className="small-at-btn-secondary" onClick={handleHide}>Hủy</button>
        </Modal.Footer>
      </Modal>
    )
  }

  return (
    <>
      <tr className={`order-${props.order.id}`}>
        <td className="item-td" colSpan={2}>
          <div className="d-flex" key={props.orderDetail.sku}>
            <img src={props.orderDetail.image} alt={props.orderDetail.name} />

            <div className="item-detail">
              <b className="fs-5">{props.orderDetail.name}</b>
              <i>{DisplayConfig(props.orderDetail.color, props.orderDetail.size)}</i>
              <div>Số lượng: {props.orderDetail.quantity}</div>
              <div>Thành tiền: {DisplayPrice(props.orderDetail.price * props.orderDetail.quantity)}</div>
            </div>
          </div>
        </td>
        <td>
          { props.order.status === 4 && !props.orderDetail.isReturn && <button className="btn btn-danger" onClick={handleShow}>Hoàn trả</button> }
        </td>
      </tr>
      
      { renderModal(props.orderDetail.id) }
    </>
  )
}

async function requestRefund(orderDetailId, price, quantity, reason) {
  if (confirm(`Bạn có muốn đề nghị đổi trả sản phẩm này?`)) {
    const response = await fetch("/refund/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({orderDetailId, price, quantity, reason})
    })

    if (response.ok) { alert("Đơn của bạn đã được đưa cho admin, bạn vui lòng chờ tí xíu nhé!"); location.reload(); }
    else alert("Đã có lỗi xảy ra, đơn của bạn chưa được đưa cho admin, bạn vui lòng thử lại nhé!");
  }
}
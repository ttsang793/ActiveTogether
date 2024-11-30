import "./OrderHistoryEmpty.css"

export default function OrderHistoryEmpty() {
  return (
    <main className="empty-cart-container">
      <h2 className="fw-bold fst-italic">CHƯA CÓ ĐƠN HÀNG</h2>
      <img src="/empty-cart.png" alt="" />
      <div className="four-o-four-detail">Bạn cần đặt ít nhất <a href="/san-pham">một đơn hàng</a> để xem!!!</div>
    </main>
  )
}
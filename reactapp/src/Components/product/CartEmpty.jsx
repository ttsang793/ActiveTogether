import "./CartEmpty.css"

export default function CartEmpty() {
  return (
    <main className="user-main empty-cart-container">
      <h1 className="fw-bold">GIỎ HÀNG ĐANG TRỐNG</h1>
      <img src="/empty-cart.png" alt="" />
      <div className="four-o-four-detail">Bạn cần thêm <a href="/san-pham">sản phẩm</a> vào giỏ hàng!!!</div>
    </main>
  )
}
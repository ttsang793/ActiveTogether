import "./CartEmpty.css"

export default function OrderEmpty() {
  return (
    <main className="user-main empty-cart-container">
      <h1 className="fw-bold">KHÔNG CÓ SẢN PHẨM THANH TOÁN</h1>
      <img src="/empty-cart.png" alt="" />
      <div className="four-o-four-detail">Bạn cần thêm <a href="/san-pham">sản phẩm</a> để thanh toán!!!</div>
    </main>
  )
}
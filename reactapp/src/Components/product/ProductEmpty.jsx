import "./ProductEmpty.css"

export default function ProductEmpty() {
  return (
    <main className="user-main empty-product-container">
      <h1 className="fw-bold">KHÔNG TÌM THẤY SẢN PHẨM</h1>
      <img src="/empty-product.png" alt="" />
      <div className="empty-detail">Chúng mình không tìm thấy sản phẩm bạn cần tìm, vui lòng thử lại nhé!</div>
    </main>
  )
}
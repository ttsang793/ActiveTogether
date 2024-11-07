import "./AddToCart.css";
import { useState } from 'react';

export default function AddToCart(props) {
  const [quantity, setQuantity] = useState(1);
  const handleChangeQuantity = e => setQuantity(e.target.value);

  return (
    <div className={"d-flex mt-2" + (props.type === "text" ? "" : " justify-content-center")}>
      <button className="minus">-</button>
      <input type="number" onChange={handleChangeQuantity} value={quantity} min="0" className="text-center quantity" />
      <button className="plus">+</button>
      {
        (props.type === "text") ?
          <button className="cart px-3" onClick={() => add(props.product, quantity)}>Thêm vào giỏ hàng</button> : 
          <button className="cart cart-img" onClick={() => add(props.product, quantity)}><i className="bi bi-cart-fill"></i></button>
      }
    </div>
  )
}

async function add(product, quantity) {
  const response = await fetch(`/cart/update?userId=1&sku=${product.sku}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      userId: 1,
      sku: product.sku,
      price: product.price,
      quantity: quantity
    })
  })

  if (response.status === 200) alert("Thêm sản phẩm vào giỏ hàng thành công!");
  else if (response.status === 201) alert("Cập nhật thông tin sản phẩm thành công!");
  else alert("Đã có lỗi xảy ra, thêm sản phẩm vào giỏ hàng thất bại.");
}
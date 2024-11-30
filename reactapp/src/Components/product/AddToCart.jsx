import "./AddToCart.css";
import { useState } from 'react';

export default function AddToCart(props) {
  const [quantity, setQuantity] = useState(1);
  const handleQuantity = number => {
    if (number >= 1) setQuantity(number);
  }
  
  return (
    <div className="add-to-cart">
      <div className="mb-2">
        Số lượng:&nbsp;
        <button className="minus ms-2" onClick={() => handleQuantity(quantity - 1)}>&minus;</button>
        <input type="text" value={quantity} className="text-center quantity" readOnly />
        <button className="plus" onClick={() => handleQuantity(quantity + 1)}>+</button>
      </div>

      <div className="text">
        <button className="cart px-3" onClick={() => add(props.product, quantity, props.username)}>Thêm vào giỏ hàng</button> 
      <button className="buy-now px-3" onClick={() => buyNow(props.product, quantity, props.username, props.image)}>Mua ngay!</button>
      </div>
    </div>
  )
}

async function add(product, quantity, username) {
  if (username !== null) {
    const response = await fetch('/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ username, sku: product.sku, price: product.price, quantity: quantity })
    })

    if (response.status === 200) alert("Thêm sản phẩm vào giỏ hàng thành công!");
    else if (response.status === 201) alert("Cập nhật thông tin sản phẩm thành công!");
    else alert("Đã có lỗi xảy ra, thêm sản phẩm vào giỏ hàng thất bại.");
  }
  else {
    alert("Vui lòng đăng nhập để thêm vào giỏ hàng");
    location.href = '/dang-nhap';
  }
}

async function buyNow(product, quantity, username, image) {  
  if (username !== null) {
    if (confirm("Bạn có muốn thanh toán ngay?")) {
      const response = await fetch('/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ username, sku: product.sku, price: product.price, quantity: quantity })
      })

      if (response.ok) {
        localStorage.setItem("payItem", JSON.stringify({
          orderProducts: [
            {
              username,
              name: product.name,
              color: product.color,
              size: product.size,
              image: image,
              sku: product.sku,
              price: product.price,
              quantity
            }
          ]
        }));
        location.href = "/thanh-toan";
      }
      else alert("Đã có lỗi xảy ra, thêm sản phẩm vào giỏ hàng thất bại.");
    }
  }
  else {
    alert("Vui lòng đăng nhập để thêm vào giỏ hàng");
    location.href = '/dang-nhap';
  }
}
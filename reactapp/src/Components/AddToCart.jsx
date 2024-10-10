import "./AddToCart.css";

export default function AddToCart(props) {
  return (
    <div className={"d-flex mt-2" + (props.type === "text" ? "" : " justify-content-center")}>
      <button className="minus">-</button>
      <input type="text" id="number" defaultValue="1" className="text-center quantity" />
      <button className="plus">+</button>
      {
        (props.type === "text") ?
          <button className="cart px-3">Thêm vào giỏ hàng</button> : 
          <button className="cart cart-img"><i className="bi bi-cart-fill"></i></button>
      }
    </div>
  )
}
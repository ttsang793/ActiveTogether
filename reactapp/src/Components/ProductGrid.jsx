import "./ProductGrid.css"
import AddToCart from "./AddToCart"
import { DisplayPrice } from "./Utility.js"

export default function ProductGrid(props) {
  return (
    <a href={`/san-pham/${props.urlName}`} className="d-flex flex-column product-grid">
      <img src={props.image} alt={props.name} />
      <p className="product-name">{props.name}</p>
      <p className="product-price">{DisplayPrice(props.price)}</p>
      <AddToCart type="image" />
    </a>
  )
}
import "./ProductGrid.css"
import AddToCart from "./AddToCart"
import { DisplayPrice } from "./Utility.js"

export default function ProductGrid(props) {
  return (
    <div className="d-flex flex-column product-grid">
      <a href={`/san-pham/${props.urlName}`} className="w-100">
        <img src={props.image} alt={props.name} className="product-thumbnail w-100" />
      </a>
      
      <a href={`/san-pham/${props.urlName}`}>
        <p className="product-name">{props.name}</p>
      </a>
      {
        props.oldPrice !== null ? <p className="product-old-price">{DisplayPrice(props.oldPrice)}</p> : <></>
      }
      <p className="product-price">{DisplayPrice(props.price)}</p>
      <AddToCart type="image" />
    </div>
  )
}
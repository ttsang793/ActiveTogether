import ProductGrid from "/src/Components/product/ProductGrid"
import "./ProductSuggestion.css"
import phd from "/src/images/placeholder.png"

export default function ProductSuggestion(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <hr />
      <div className="product-suggesstion-list">
        <ProductGrid image={phd} name="Giày Adidas" price={20000} oldPrice={null} />
        <ProductGrid image={phd} name="Giày Adidas" price={20000} oldPrice={30000} soldout={true} />
        <ProductGrid image={phd} name="Giày Adidas" price={20000} oldPrice={30000} />
        <ProductGrid image={phd} name="Giày Adidas" price={20000} oldPrice={30000} />
        <ProductGrid image={phd} name="Giày Adidas" price={20000} oldPrice={30000} soldout={true} />
      </div>
    </div>
  )
}
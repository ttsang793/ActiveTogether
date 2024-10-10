import ProductGrid from "/src/Components/ProductGrid"
import phd from "/src/img/placeholder.png"

export default function ProductSuggestion(props) {
  return (
    <div className="my-5">
      <h2>{props.title}</h2>
      <hr />
      <div className="d-flex">
        <ProductGrid image={phd} name="Giày Adidas" price={20000} />
        <ProductGrid image={phd} name="Giày Adidas" price={20000} />
        <ProductGrid image={phd} name="Giày Adidas" price={20000} />
        <ProductGrid image={phd} name="Giày Adidas" price={20000} />
        <ProductGrid image={phd} name="Giày Adidas" price={20000} />
      </div>
    </div>
  )
}
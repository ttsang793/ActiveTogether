import ProductGrid from "/src/Components/product/ProductGrid"
import "./ProductSuggestion.css"
import phd from "/src/images/placeholder.png"

export default function ProductSuggestion(props) {
  const sampleColor = [
    {colorCode: "#FF0000", productImages: [{image: phd}]},
    {colorCode: "#008000", productImages: [{image: phd}]},
    {colorCode: "#00FFFF", productImages: [{image: phd}]},
    {colorCode: "#FFFF00", productImages: [{image: phd}]},
  ]

  return (
    <div>
      <h2>{props.title}</h2>
      <hr />
      <div className="product-suggesstion-list">
        <ProductGrid name="Giày Adidas" price={800000} oldPrice={null} productColors={sampleColor} />
        <ProductGrid name="Giày Adidas" price={800000} oldPrice={1000000} productColors={sampleColor} soldout={true} />
        <ProductGrid name="Giày Adidas" price={800000} oldPrice={null} productColors={sampleColor} />
        <ProductGrid name="Giày Adidas" price={800000} oldPrice={1000000} productColors={sampleColor} />
        <ProductGrid name="Giày Adidas" price={800000} oldPrice={1000000} productColors={sampleColor} soldout={true} />
      </div>
    </div>
  )
}
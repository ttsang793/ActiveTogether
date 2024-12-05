import ProductGrid from "/src/Components/product/ProductGrid"
import "./ProductSuggestion.css"
import { useState, useEffect } from 'react';

export default function ProductSuggestion(props) {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    if (props.filter === "top") fetch('/product/get/top').then(response => response.json()).then(data => setProduct(data)).catch(() => {});
    else fetch('/product/get/recent/local', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: localStorage.getItem("recent")
    }).then(response => response.json()).then(data => setProduct(data)).catch(() => setProduct([]));
  }, [])

  return product.length === 0 ? <></> : (
    <div>
      <h2>{props.title}</h2>
      <hr />
      <div className="product-suggesstion-list">
        {product.map(p => {
          try {
            const salePercent = 1 - p.promotionDetails[0].percent;
            return <ProductGrid key={p.urlName} urlName={p.urlName} name={p.name} price={p.price * salePercent} oldPrice={p.promotionDetails.length > 0 ? p.price : null} productColors={p.productColors} />
          }
          catch {
            return <ProductGrid key={p.urlName} urlName={p.urlName} name={p.name} price={p.price} oldPrice={null} productColors={p.productColors} />
          }
        })}
      </div>
    </div>
  )
}
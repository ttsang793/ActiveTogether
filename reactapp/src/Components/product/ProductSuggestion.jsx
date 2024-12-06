import ProductGrid from "/src/Components/product/ProductGrid"
import "./ProductSuggestion.css"
import { useState, useEffect, useRef } from 'react';

function ProductSuggestionBody(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <hr />
      <div className="product-suggesstion-list">
        {props.product.map(p => {
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

export default function ProductSuggestion(props) {
  let [product, setProduct] = useState([]);
  const hasFetch = useRef(false);

  useEffect(() => {
    if (hasFetch.current) return;

    if (props.filter === "top") fetch('/product/get/top').then(response => response.json()).then(data => setProduct(data)).catch(() => {});
    else if (props.username === null) fetch('/product/get/recent/local', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: localStorage.getItem("recent") || JSON.stringify({ urlName: [] })
    }).then(response => response.json()).then(data => setProduct(product = data)).catch(() => {});
    else fetch(`/product/get/recent?username=${props.username}`, {method: 'POST'})
      .then(response => response.json()).then(data => setProduct(product = data)).catch(() => {});

    hasFetch.current = true;
  }, [])

  if (product.length == 0) return <></>;
  else return (props.home === undefined) ? <><ProductSuggestionBody product={product} title={props.title} /></> : (
    <div className="main-margin py-5">
      <ProductSuggestionBody product={product} title={props.title} />
    </div>
  )
}
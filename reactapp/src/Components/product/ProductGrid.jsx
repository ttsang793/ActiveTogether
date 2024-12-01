import "./ProductGrid.css"
import { DisplayPrice } from "/src/Scripts/Utility.js"
import { useState } from 'react'

export default function ProductGrid(props) {
  let [image, setImage] = useState(props.productColors[0].productImages[0].image);
  const handleImage = i => setImage(image = props.productColors[i].productImages[0].image);
  const restoreImage = () => setImage(image = props.productColors[0].productImages[0].image);

  return (
    <div className="product-grid">
      <a href={`/san-pham/${props.urlName}`} className="w-100 text-center">
        <img src={image} alt={props.name} className="product-thumbnail w-100" />
      </a>
      
      <a href={`/san-pham/${props.urlName}`} className="product-name">
        <p>{props.name}</p>
      </a>
      
      {
        (props.oldPrice !== null ? <p className="product-old-price">{DisplayPrice(props.oldPrice)}</p> : <></>)
      }
      <p className="product-price">{DisplayPrice(props.price)}</p>

      <div className="product-color-list">
      {
        (props.productColors !== undefined && props.productColors.length > 1) ?
          props.productColors.map((c, i) =>
            <div className="product-color pointer mt-3" style={{backgroundColor: `${c.colorCode}`}} key={`${i}_${c.colorCode}`} onMouseOver={() => handleImage(i)}
              onMouseLeave={() => restoreImage()} onClick={() => location.href = `/san-pham/${props.urlName}/${i}`}>
            </div>
          ) : <></>
      }
      </div>
    </div>
  )
}
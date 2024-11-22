import ProductStar from "/src/Components/productreview/ProductStar"
import { DisplayDate, DisplayConfig } from "/src/Scripts/Utility.js"
import "./Review.css"

export default function Review({ review })  {
  return (
    <div className="review">
      <div className="review-header">
        <img src="/src/images/avatar.jpg" alt="avatar" />
        <div className="w-100">
          <div className="review-header-name">
            <div><b>{review.userFullName}</b></div>
            <div><i>{DisplayDate(review.datePublish)}</i></div>
          </div>
          
          <ProductStar star={review.star} />

          <div className="review-sku">
            {DisplayConfig(review.color, review.size)}
          </div>
        </div>
      </div>
      <div className="review-body mt-2">
        {review.review}
      </div>
    </div>
  )
}
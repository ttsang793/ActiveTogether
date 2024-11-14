export default function ProductReview(review) {
  return (
    <div className="d-flex">
      <img src="/src/img/avatar.jpg" alt={props.id} />
      <div>
        <p>{review.userFullName} - {review.star}</p>
        <p>{review.size} - {review.color}</p>
        <p>{review.review}</p>
      </div>
    </div>
  )
}
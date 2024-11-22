import "./ProductStarBar.css"

export default function ProductStarBar(props) {
  return (
    <div className="d-flex align-items-center c-10">
      {props.rating}
      <div className="line">
        <div className="display-line" style={{width: `${props.width}%`}}></div>
      </div>
    </div>
  )
}
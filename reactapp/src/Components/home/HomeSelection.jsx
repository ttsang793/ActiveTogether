import "./HomeSelection.css"

export default function HomeSelection(props) {
  return (
    <a className="home-link home-selection pointer" href={`/san-pham?${props.params}=${props.id}`}>
      <div className="text-center">
        <img src={props.image} alt={props.name} className={`${props.radius ? "radius" : ""}`} />
      </div>
      <span>{props.name}</span>
    </a>
  )
}
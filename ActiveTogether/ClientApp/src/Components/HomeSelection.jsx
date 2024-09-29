import "./HomeSelection.css"

export default function HomeSelection(props) {
  return (
    <div className="home-selection" style={{width: props.width + "%"}}>
      <img src={props.image} alt={props.name} />
      <a className="home-link" href="san-pham.html">{props.name}</a>
    </div>
  )
}
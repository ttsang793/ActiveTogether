import "./FilterList.css"
import Filter from "./Filter"

export default function FilterList(props) {
  return (
    <div className="filter d-flex">
      { props.filters.map((f,i) => <Filter title={f.title} details={f.details} col={props.filters.length} key={i} />) }
    </div>
  )
}
import "./FilterList.css"
import Filter from "./Filter"

export default function FilterList(props) {
  const onClick = (params, filter) => props.onClick(params, filter)
  const reloadPage = e => props.reloadPage(e, 1);

  return (
    <div className="filter w-100">
      {
        props.filters.map((f,i) => <Filter title={f.title} params={f.params} col={props.filters.length} key={i} details={f.details}
                                            initialParams={props.initialParams} onClick={onClick} />)
      }
      <div className="d-flex align-items-center pointer px-3 save-btn" onClick={reloadPage}>
        <i className={`bi bi-floppy`}></i>
      </div>
    </div>
  )
}
import "./Filter.css"
import { CamelToKebab } from "./Utility";

function DropdownClick(e) {
  e.stopPropagation();
  document.getElementById(e.target.children[0].id).checked = !document.getElementById(e.target.children[0].id).checked;
}

export default function Filter(props) {
  return (
    <div className="dropdown flex-fill" width={`calc(100% / ${props.col})`}>
      <button className="dropdown-toggle filter-button w-100" data-bs-toggle="dropdown">
        {props.title}
      </button>
      <div className="dropdown-menu" onClick={e => DropdownClick(e)}>
        {props.details.map((i,e) => (<div className="filter-item" key={e}><input type="checkbox" id={`${CamelToKebab(props.title)}-${e}`} /> {i}</div>))}
      </div>
    </div>
  );
}
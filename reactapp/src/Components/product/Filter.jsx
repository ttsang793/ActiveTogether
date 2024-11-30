import "./Filter.css"
import { CamelToKebab } from "/src/Scripts/Utility";

export default function Filter(props) {
  function defaultChecked(id) {
    const index = props.initialParams.findIndex(p => p.param == props.params);
    return index >= 0 && props.initialParams[index].content.includes(id.toString());
  }

  return (
    <div className="dropdown flex-fill" width={`calc(100% / ${props.col})`}>
      <button className="dropdown-toggle filter-button w-100" data-bs-toggle="dropdown">
        {props.title}
      </button>
      <div className="dropdown-menu" onClick={e => DropdownClick(e)}>
        {props.details.map((i,e) => (
          <div className="filter-item pointer" key={e}>
            <input type="checkbox" id={`${CamelToKebab(props.title)}-${e}`} value={i.id} checked={defaultChecked(i.id)}
             onChange={() => props.onClick(props.params, i.id)} /> {i.name}
          </div>
        ))}
      </div>
    </div>
  );

  function DropdownClick(e) {
    e.stopPropagation();
    if (e.target.classList.length == 0) return;

    const clickDetail = document.getElementById(e.target.children[0].id)
    clickDetail.checked = !clickDetail.checked;
    props.onClick(props.params, e.target.children[0].value)
  }
}
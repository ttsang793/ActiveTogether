import "./NavButton.css"

export default function NavButton(props) {
  return (    
    <li className="nav pointer">
      <a href={props.url} className="nav-link">
        <i className={`bi ${props.icon}`}></i> {props.name}
      </a>
    </li>
  )
}
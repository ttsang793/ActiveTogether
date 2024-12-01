import "./AdminTextBox.css"

export default function AdminTextBox(props) {
  const handleChange = e => props.onChange(e);
  const handleKeyDown = e => {
    if (e.keyCode === 13) props.onKeyDown();
  }

  if (props.type === "search") {
    return (
      <input
        type="search"
        id="search"
        value={props.value}
        className="form-control"
        placeholder={props.placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    )
  }
  else if (props.type === "date") {
    return (
      <div className="mb-3">
        <label htmlFor={props.detail} className="fw-semibold">{props.placeholder}:</label>
        <input
          type="date"
          id={props.detail}
          value={props.value} 
          className="form-control mt-1"
          onChange={handleChange}
        />
        <div id={props.detail + "-error"} className="error-value">{props.errorValue}</div>
      </div>
    )
  }
  else return (
    <div className="mb-3">
      <label htmlFor={props.detail} className="fw-semibold">{props.placeholder}:</label>
      <input
        type={props.type}
        id={props.detail}
        value={props.value}
        className="form-control mt-1"
        readOnly={props.readonly}
        placeholder={props.placeholder}
        onChange={handleChange}
      />
      <div id={props.detail + "-error"} className="error-value">{props.errorValue}</div>
    </div>
  )
}
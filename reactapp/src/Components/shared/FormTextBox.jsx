import React, { useState } from "react";
import "./FormTextBox.css"

export default function FormTextBox(props) {
  const handleChange = e => props.onValueChange(e);
  const [focus, setFocus] = useState(true);

  function onFocus(id) {
    setFocus(true);
    const placeholder = document.getElementById(`${id}-placeholder`);
    placeholder.style.color = "var(--darkest)";
    placeholder.style.fontSize = "15px";
    placeholder.style.transform = "translate(-50px, -40px)";
    placeholder.style.fontWeight = "bold";
  }

  function onBlur(e, id) {
    setFocus(false);
    if (e.target.value === "") {
      const placeholder = document.getElementById(`${id}-placeholder`);
      placeholder.style.color = "var(--darker)";
      placeholder.style.fontSize = "18px";
      placeholder.style.transform = "translate(0, 0)";
      placeholder.style.fontWeight = "normal";
    }
  }

  function togglePassword(e, id) {
    e.preventDefault();
    if (document.getElementById(id).type === "password") {
      document.getElementById(id).type = "text";
      e.target.classList.add('bi-eye-slash-fill');
      e.target.classList.remove("bi-eye-fill");
    }
    else {
      document.getElementById(id).type = "password";
      e.target.classList.add("bi-eye-fill");
      e.target.classList.remove('bi-eye-slash-fill');
    }
  }

  if (props.type.toLowerCase().includes("password"))
    return (
      <div className={`form-input-container ${props.disabled ? "disabled" : ""}`}>
        <div className="d-flex align-items-center">
          <input
            type="password"
            id={props.type}
            className="form-input password-input py-2"
            value={props.value}
            autoComplete={props.type}
            onFocus={e => onFocus(e.target.id)}
            onBlur={e => onBlur(e, e.target.id)}
            onChange={handleChange}
          />
          <label
            htmlFor={props.type}
            className={`form-placeholder ${(props.value === "" && focus) ? "down" : "up"}-placeholder`}
            id={props.type + "-placeholder"}
          >
            {props.placeholder}
          </label>
          <i className={`symbol bi ${props.icon}`}></i>
          <i className="password-eye bi bi-eye-fill" onClick={e => togglePassword(e, props.type)}></i>
        </div>
        <div id={props.type + "-error"} className="error-value">{props.errorValue}</div>
      </div>
    );

  else return (
    <div className={`form-input-container ${props.disabled ? "disabled" : ""}`}>
      <div className="d-flex align-items-center">
        <input
          type="text"
          id={props.type}
          className={`form-input py-2 ${props.readonly && "readonly"}`}
          value={props.value}
          autoComplete={props.type}
          onFocus={e => onFocus(e.target.id)}
          onBlur={e => onBlur(e, e.target.id)}
          onChange={handleChange} />
        <label
          htmlFor={props.type}
          className={`form-placeholder ${(props.value === "" && focus) ? "down" : "up"}-placeholder`}
          id={props.type + "-placeholder"}
        >
          {props.placeholder}
        </label>
        <i className={`symbol bi ${props.icon}`}></i>
      </div>
      <div id={props.type + "-error"} className="error-value">{props.errorValue}</div>
    </div>
  );
}
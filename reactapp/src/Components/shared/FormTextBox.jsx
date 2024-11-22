import React, { useEffect, useRef } from "react";
import "./FormTextBox.css"

function movePlaceholder(e, id) {
  e.preventDefault();
  document.getElementById(`${id}-error`).innerHTML = "";
  document.getElementById(id).style.boxShadow = "0px 5px 15px #ffc194d7";
  if (e.target.value === "") {
    const placeholder = document.getElementById(`${id}-placeholder`);
    placeholder.classList.add("up-placeholder");
    placeholder.classList.remove("down-placeholder");
  }
}

function returnPlaceholder(e, id) {
  e.preventDefault();
  document.getElementById(id).style.boxShadow = "none";
  if (e.target.value === "") {
    const placeholder = document.getElementById(`${id}-placeholder`);
    placeholder.classList.add("down-placeholder");
    placeholder.classList.remove("up-placeholder");
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

export default function FormTextBox(props) {
  const handleChange = e => props.onValueChange(e.target.value);

  const inputRef = useRef(null);
  const placeholderRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && inputRef.current.value !== "") {
      placeholderRef.current.classList.add("up-placeholder");
      placeholderRef.current.classList.remove("down-placeholder");
    }
  }, []);

  if (props.type.toLowerCase().includes("password"))
    return (
      <div className="form-input-container">
        <div className="d-flex align-items-center">
          <input type="password" id={props.type} className="form-input password-input py-2" ref={inputRef} autoComplete={props.type}
            onFocus={e => movePlaceholder(e, e.target.id)} onBlur={e => returnPlaceholder(e, e.target.id)}
            onChange={handleChange} />
          <label htmlFor={props.type} className="form-placeholder" id={props.type + "-placeholder"} ref={placeholderRef}>{props.placeholder}</label>
          <i className={`symbol bi ${props.icon}`}></i>
          <i className="password-eye bi bi-eye-fill" onClick={e => togglePassword(e, props.type)}></i>
        </div>
        <div id={props.type + "-error"} className="error-value">{props.errorValue}</div>
      </div>
    );
  else return (
    <div className="form-input-container">
      <div className="d-flex align-items-center">
        <input type="text" id={props.type} className={`form-input py-2 ${props.readonly && "readonly"}`} value={props.value} ref={inputRef} autoComplete={props.type}
          onFocus={e => movePlaceholder(e, e.target.id)} onBlur={e => returnPlaceholder(e, e.target.id)}
          onChange={handleChange} />
        <label htmlFor={props.type} className={`form-placeholder`} id={props.type + "-placeholder"} ref={placeholderRef}>{props.placeholder}</label>
        <i className={`symbol bi ${props.icon}`}></i>
      </div>
      <div id={props.type + "-error"} className="error-value">{props.errorValue}</div>
    </div>
  );
}
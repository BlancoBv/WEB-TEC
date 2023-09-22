import React from "react";

function Input({ name, value, label, handle, placeholder, type }) {
  return (
    <div className="mb-3">
      <label>{label}</label>
      <input
        type={type}
        className="form-control"
        value={value.hasOwnProperty(name) ? value[name] : ""}
        placeholder={placeholder}
        onChange={handle}
        name={name}
      />
    </div>
  );
}
Input.defaultProps = {
  label: "Input de ejemplo",
  placeholder: "Input de ejemplo",
  value: {},
  type: "text",
};

export default Input;

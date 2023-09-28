import React, { useState } from "react";

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

export const InputImage = ({
  multiple,
  name,
  setVariable,
  variable,
  label,
  required,
}) => {
  const handle = (e) => {
    e.preventDefault();
    let resultForMultiple = [];

    const { name, files } = e.target;
    if (multiple && files.length > 1) {
      Array.from(files).forEach((element) => {
        const reader = new FileReader();
        reader.readAsDataURL(element);
        reader.onload = (e) => {
          resultForMultiple.push(e.target.result);
        };
      });
      console.log(resultForMultiple);
      setVariable({ ...variable, [name]: resultForMultiple });
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (e) => {
        setVariable({ ...variable, [name]: [e.target.result] });
      };
    }
  };

  return (
    <div className="mb-3">
      <label>{label}</label>
      <input
        className="form-control"
        type="file"
        //value={body.imagenPrincipal}
        name={name}
        onChange={handle}
        accept="image/*"
        multiple={multiple}
        required={required}
      />
    </div>
  );
};
InputImage.defaultProps = {
  multiple: false,
  label: "Input tipo imagen de ejemplo",
  required: false,
};

export const InputSwitchAction = ({
  initialChecked,
  checkedAction,
  uncheckedAction,
}) => {
  const [value, setValue] = useState(initialChecked);

  const handle = (e) => {
    const { checked } = e.target;
    if (checked) {
      setValue(checked);
      checkedAction();
    } else {
      setValue(checked);
      uncheckedAction();
    }
  };

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        role="switch"
        checked={value}
        onChange={handle}
      />
    </div>
  );
};
InputSwitchAction.defaultProps = {
  initialChecked: false,
};
export default Input;

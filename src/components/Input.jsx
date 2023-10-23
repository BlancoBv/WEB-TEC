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
      const imgSrc = URL.createObjectURL(files[0]);
      setVariable({ ...variable, [name]: { file: files[0], src: imgSrc } });
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

export const InputDate = ({ label, name, handle, value }) => {
  return (
    <div className="mb-3">
      <label>{label}</label>
      <input
        name={name}
        className="form-control"
        type="date"
        value={value.hasOwnProperty(name) ? value[name] : ""}
        onChange={handle}
      />
    </div>
  );
};
InputDate.defaultProps = {
  label: "Input fecha",
};

export const InputSelect = ({
  label,
  name,
  handle,
  value,
  initialOption,
  children,
}) => {
  return (
    <div className="mb-3">
      <label>{label}</label>
      <select
        name={name}
        className="form-select"
        value={value.hasOwnProperty(name) ? value[name] : ""}
        onChange={handle}
      >
        <option value="">{`${initialOption}...`}</option>
        {children}
      </select>
    </div>
  );
};
InputSelect.defaultProps = {
  initialOption: "Selecciona una opción",
};

export default Input;

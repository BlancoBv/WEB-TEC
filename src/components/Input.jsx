import React, { useState } from "react";

function Input({
  name,
  value,
  label,
  handle,
  placeholder,
  type,
  required,
  id,
  disabled,
}) {
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
        required={required}
        id={id}
        disabled={disabled}
      />
    </div>
  );
}
Input.defaultProps = {
  label: "Input de ejemplo",
  placeholder: "Input de ejemplo",
  value: {},
  type: "text",
  required: false,
  disabled: false,
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

    const { name, files, value } = e.target;
    if (multiple && files.length > 1) {
      Array.from(files).forEach((element) => {
        const reader = new FileReader();
        reader.readAsDataURL(element);
        reader.onload = (e) => {
          resultForMultiple.push(e.target.result);
        };
      });
      setVariable({ ...variable, [name]: resultForMultiple });
    } else {
      const imgSrc = URL.createObjectURL(files[0]);
      setVariable({
        ...variable,
        [name]: { file: files[0], src: imgSrc },
        value,
      });
    }
  };

  return (
    <div className="mb-3">
      <label>{label}</label>
      <input
        className="form-control"
        type="file"
        name={name}
        value={variable.hasOwnProperty("value") ? variable["value"] : ""}
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
  label,
  required,
  disabled,
}) => {
  const [value, setValue] = useState(initialChecked);

  const handle = (e) => {
    const { checked } = e.target;
    if (checked) {
      const status = checkedAction();
      if (status) {
        setValue(status);
      }
    } else {
      const status = uncheckedAction();
      if (status) {
        setValue(!status);
      }
    }
  };

  return (
    <div className="form-check form-switch">
      {label ? (
        <label>
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            checked={value}
            onChange={handle}
            required={required}
            disabled={disabled}
          />
          {label}
        </label>
      ) : (
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          checked={value}
          onChange={handle}
          required={required}
        />
      )}
    </div>
  );
};
InputSwitchAction.defaultProps = {
  initialChecked: false,
  required: false,
  disabled: false,
};

export const InputDate = ({ label, name, handle, value, required }) => {
  return (
    <div className="mb-3">
      <label>{label}</label>
      <input
        name={name}
        className="form-control"
        type="date"
        value={value.hasOwnProperty(name) ? value[name] : ""}
        onChange={handle}
        required={required}
      />
    </div>
  );
};
InputDate.defaultProps = {
  label: "Input fecha",
  required: false,
};

export const InputSelect = ({
  label,
  name,
  handle,
  value,
  initialOption,
  children,
  required,
}) => {
  return (
    <div className="mb-3">
      <label>{label}</label>
      <select
        name={name}
        className="form-select"
        value={value.hasOwnProperty(name) ? value[name] : ""}
        onChange={handle}
        required={required}
      >
        <option value="">{`${initialOption}...`}</option>
        {children}
      </select>
    </div>
  );
};
InputSelect.defaultProps = {
  initialOption: "Selecciona una opción",
  required: false,
};

export const InputFile = ({
  label,
  name,
  required,
  aceptar,
  variable,
  setVariable,
  multiple,
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
        accept={aceptar}
        multiple={multiple}
        required={required}
      />
    </div>
  );
};

InputFile.defaultProps = {
  aceptar: ".pdf",
};

export const InputTextArea = ({
  name,
  value,
  label,
  handle,
  placeholder,
  type,
  required,
}) => {
  return (
    <div className="d-flex flex-column h-100 w-100">
      <label>{label}</label>
      <textarea
        type={type}
        className="form-control flex-grow-1 no-resize"
        value={value.hasOwnProperty(name) ? value[name] : ""}
        placeholder={placeholder}
        onChange={handle}
        name={name}
        required={required}
      />
    </div>
  );
};
InputTextArea.defaultProps = {
  label: "Input de ejemplo",
  placeholder: "Input de ejemplo",
  value: {},
  type: "text",
  required: false,
};

export default Input;

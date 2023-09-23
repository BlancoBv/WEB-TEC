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

export const InputImage = ({
  multiple,
  name,
  setVariable,
  variable,
  label,
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
      />
    </div>
  );
};
InputImage.defaultProps = {
  multiple: false,
  label: "Input tipo imagen de ejemplo",
};

export default Input;

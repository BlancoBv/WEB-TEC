import React from "react";

function Dropdown({ items, title }) {
  return (
    <div className="dropdown">
      {title} <i className="fa-solid fa-caret-down" />
      <div className="dropdown-content">
        {items.map((el) => (
          <p className="dropdown-item">{el.item}</p>
        ))}
      </div>
    </div>
  );
}
Dropdown.defaultProps = {
  title: "Texto de ejemplo",
  items: [
    { item: "Contenido 1", link: "" },
    { item: "Contenido 2", link: "" },
  ],
};

export default Dropdown;

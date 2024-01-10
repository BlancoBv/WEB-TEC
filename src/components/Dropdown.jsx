import React from "react";
import { Link } from "react-router-dom";

function Dropdown({ items, title, background, responsive, index }) {
  return (
    <div className="dropdown">
      {title} <i className="fa-solid fa-caret-down" />
      <div
        className={`dropdown-content${responsive ? "-responsive" : ""}`}
        style={{ backgroundColor: background }}
      >
        {items.map((el, i) => (
          <Link
            key={i}
            className="dropdown-item"
            to={index ? "/" + el.ruta : el.ruta}
          >
            {el.subcategoria}
          </Link>
        ))}
      </div>
    </div>
  );
}
Dropdown.defaultProps = {
  title: "Texto de ejemplo",
  items: [
    { subcategoia: "Contenido 1", ruta: "" },
    { subcategoia: "Contenido 2", ruta: "" },
  ],
  background: "rgba(27, 57, 106, 0.98)",
  responsive: false,
  index: false,
};

export const DropdownActions = ({ items, title, background }) => {
  return (
    <div className="dropdown">
      {title} <i className="fa-solid fa-caret-down" />
      <div className="dropdown-content" style={{ backgroundColor: background }}>
        {items.map((el, i) => (
          <div key={i} className="dropdown-item" onClick={el.action}>
            {el.item}
          </div>
        ))}
      </div>
    </div>
  );
};
DropdownActions.defaultProps = {
  title: "Texto de ejemplo",
  items: [
    { item: "Contenido 1", link: "" },
    { item: "Contenido 2", link: "" },
  ],
  background: "rgba(27, 57, 106, 0.98)",
};

export default Dropdown;

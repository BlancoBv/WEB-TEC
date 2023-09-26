import React from "react";
import { Link } from "react-router-dom";

function Dropdown({ items, title, background }) {
  return (
    <div className="dropdown">
      {title} <i className="fa-solid fa-caret-down" />
      <div className="dropdown-content" style={{ backgroundColor: background }}>
        {items.map((el, i) => (
          <Link key={i} className="dropdown-item" to={el.link}>
            {el.item}
          </Link>
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
  background: "rgba(27, 57, 106, 0.98)",
};

export default Dropdown;

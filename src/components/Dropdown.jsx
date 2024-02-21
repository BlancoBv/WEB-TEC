import React from "react";
import { NavLink } from "react-router-dom";
import regularExp from "../assets/regularExp";

function Dropdown({
  items,
  title,
  background,
  responsive,
  includeMainRoute,
  mainRoute,
  targetUrl,
  targetName,
}) {
  console.log(includeMainRoute);
  return (
    <div className="dropdown">
      {title} <i className="fa-solid fa-caret-down" />
      <div
        className={`dropdown-content${responsive ? "-responsive" : ""}`}
        style={{ backgroundColor: background }}
      >
        {items.map((el, i) => (
          <NavLink
            key={i}
            className="dropdown-item"
            to={
              includeMainRoute && !regularExp("http", el.ruta)
                ? `${mainRoute}/${el[targetUrl]}`
                : el[targetUrl]
            }
            target={regularExp("http", el.ruta) ? "_blank" : ""}
          >
            {el[targetName]}
          </NavLink>
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
  includeMainRoute: false,
  targetName: "subcategoria",
  targetUrl: "ruta",
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

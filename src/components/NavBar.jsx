import React from "react";
import useGetData from "../hooks/useGetData";
import { NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";

function NavBar() {
  const { data, isPending } = useGetData("/categorias/obtener");
  const element = document.getElementById("nav-menu-content");
  const showOffCanvas = () => {
    console.log(element);
    element.style.display = "flex";
    element.classList.add("active");
  };
  const closeOffCanvas = () => {
    element.style.display = "";
    element.classList.remove("active");
  };
  return (
    <>
      <div
        className="nav-menu-container" /* "blueBackground text-white blueMenu d-flex justify-content-evenly align-items-center" */
      >
        <button
          type="button"
          className="nav-menu-button"
          onClick={showOffCanvas}
        >
          Menu
        </button>
        <div className="nav-menu-items" id="nav-menu-content">
          <button type="button" onClick={closeOffCanvas}>
            close
          </button>
          <NavLink className="text-decoration-none text-white" to="/" end>
            <i className="fa-solid fa-house" />
          </NavLink>
          {!isPending &&
            data.response.map((el) => {
              if (el.dropcollapse) {
                return (
                  <Dropdown
                    key={el.idcategoria}
                    title={el.categoria}
                    items={el.subcategorias}
                    responsive={true}
                    includeMainRoute={true}
                    mainRoute={el.ruta}
                  />
                );
              }
              return (
                <NavLink key={el.idcategoria} to={el.ruta}>
                  {el.categoria}
                </NavLink>
              );
            })}
          <NavLink
            className="text-decoration-none text-white"
            to="/login"
            target="_blank"
          >
            Identificate <i className="fa-solid fa-user" />
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default NavBar;

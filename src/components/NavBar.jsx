import React from "react";
import useGetData from "../hooks/useGetData";
import { NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";
import LoadingContent from "./LoadingContent";
import regularExp from "../assets/regularExp";

function NavBar() {
  const { data, isPending } = useGetData("/categorias/obtener");
  const element = document.getElementById("nav-menu-content");
  const showOffCanvas = () => {
    console.log(element);
    element.style.left = "0px";
    element.style.width = "75%";
  };
  const closeOffCanvas = () => {
    element.style.left = "";
    element.style.width = "";
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
          <i className="fa-solid fa-bars" />
        </button>
        <div className="nav-menu-items" id="nav-menu-content">
          <button type="button" onClick={closeOffCanvas}>
            <i className="fa-solid fa-xmark" />
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
                <NavLink
                  key={el.idcategoria}
                  to={el.ruta}
                  target={regularExp("http", el.ruta) ? "_blank" : ""}
                >
                  {el.categoria}
                </NavLink>
              );
            })}
          {isPending && (
            <>
              <div className="w-50px h-10px">
                <LoadingContent />
              </div>
              <div className="w-50px h-10px">
                <LoadingContent />
              </div>
              <div className="w-50px h-10px">
                <LoadingContent />
              </div>
            </>
          )}
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

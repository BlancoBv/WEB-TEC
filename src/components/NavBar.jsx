import React from "react";
import useGetData from "../hooks/useGetData";
import { NavLink } from "react-router-dom";
import Dropdown from "./Dropdown";

function NavBar() {
  const { data, isPending } = useGetData("/categorias/obtener");
  console.log(isPending);
  return (
    <div className="blueBackground text-white blueMenu d-flex justify-content-evenly align-items-center">
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
              />
            );
          }
          return (
            <NavLink key={el.idcategoria} to={el.ruta}>
              {el.categoria}
            </NavLink>
          );
        })}
      <div className="placeholder-glow">
        <div className="placeholder">XX</div>
      </div>
    </div>
  );
}

export default NavBar;

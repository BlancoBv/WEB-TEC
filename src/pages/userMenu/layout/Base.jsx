import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import itsr from "../../../assets/img/logoitsr.png";
import Perm from "../../../auth/Perm";

function Base() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const configOptions = [
    {
      name: "Noticias",
      icon: "fa-solid fa-newspaper",
      route: "noticias",
      show: Perm(8) || Perm(9) || Perm(10),
    },
    {
      name: "Banners",
      icon: "fa-solid fa-panorama",
      route: "banners",
      show: Perm(5) || Perm(6) || Perm(7),
    },
    {
      name: "Convocatorias",
      icon: "fa-solid fa-newspaper",
      route: "convocatorias",
      show: Perm(13) || Perm(14) || Perm(15),
    },
    {
      name: "Etiquetas",
      icon: "fa-solid fa-tag",
      route: "etiquetas",
      show: Perm(16),
    },
    {
      name: "Menus",
      icon: "fa-solid fa-bookmark",
      route: "menus-control",
      show: Perm(17),
    },
    {
      name: "Menus secundarios",
      icon: "fa-solid fa-bookmark",
      route: "menus-control-secundarios",
      show: Perm(18),
    },
    {
      name: "Usuarios",
      icon: "fa-solid fa-user",
      route: "user-control",
      show: Perm(1),
    },
  ];

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  return (
    <div
      className="h-100 d-flex p-2 gap-2 bg-dark-mode text-white"
      data-bs-theme="dark"
    >
      <div className="w-15 d-flex flex-column justify-content-evenly align-items-end rounded bg-dark-mode-base user-side-bar">
        {configOptions.map(
          (el, i) =>
            el.show && (
              <NavLink
                key={i}
                to={el.route}
                className="w-90 d-flex align-items-center justify-content-center"
              >
                <span>
                  <i className={`${el.icon} fs-4`} /> {el.name}
                </span>
              </NavLink>
            )
        )}
      </div>
      <div className="w-85 h-100 d-flex flex-column">
        <div className="bg-dark-mode-base h-10 rounded p-2 d-flex gap-2">
          <img
            src={itsr}
            height="100%"
            onClick={() => navigate("/panel")}
            role="button"
          />
          <h3>Panel de administración de la pagina</h3>
          <div className="flex-grow-1 d-flex justify-content-end align-items-center gap-2">
            <span>
              <i className="fa-solid fa-user" />{" "}
              {`${user.nombres} ${user.apepat} ${user.apemat}`}
            </span>
            <button
              onClick={logout}
              className="text-danger"
              style={{
                outline: "none",
                backgroundColor: "rgba(0,0,0,0)",
                border: "none",
              }}
              title="Cerrar sesión"
            >
              <i className="fa-solid fa-right-from-bracket" />
            </button>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export const NavigationMenuUser = ({ tabs, mainRoute }) => {
  return (
    <div className="nav-menu-tabs">
      {tabs.map(
        (el) =>
          el.show && (
            <NavLink to={`${el.route}`} key={el.name} end>
              <i className={el.icon} />
              <span>{el.name}</span>
            </NavLink>
          )
      )}
    </div>
  );
};

NavigationMenuUser.defaultProps = {
  tabs: [
    { name: "Opcion 1", route: "crear" },
    { name: "Opcion 2", route: "" },
  ],
  mainRoute: "noticias",
};

export default Base;

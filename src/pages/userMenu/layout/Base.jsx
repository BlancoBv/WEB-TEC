import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import itsr from "../../../assets/img/logoitsr.png";

function Base() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [showAddNotice, setShowAddNotice] = useState(false);
  const [showBanners, setShowBanners] = useState(false);
  const [showNoticiasPend, setShowNoticiasPend] = useState(false);

  const showBannersSection = () => {
    setShowAddNotice(false);
    setShowBanners(true);
    setShowNoticiasPend(false);
  };
  const showNoticeSection = () => {
    setShowBanners(false);
    setShowAddNotice(true);
    setShowNoticiasPend(false);
  };
  const showNoticiasPendientes = () => {
    setShowBanners(false);
    setShowAddNotice(false);
    setShowNoticiasPend(true);
  };
  const configOptions = [
    {
      name: "Noticias",
      icon: "fa-solid fa-newspaper",
      route: "noticias",
    },
    {
      name: "Banners",
      icon: "fa-solid fa-panorama",
      activate: () => showBannersSection(),
      route: "banners",
    },
    {
      name: "Convocatorias",
      icon: "fa-solid fa-newspaper",
      route: "convocatorias",
    },
    {
      name: "Etiquetas",
      icon: "fa-solid fa-tag",
      route: "etiquetas",
    },
    {
      name: "Menus",
      icon: "fa-solid fa-bookmark",
      route: "menus-control",
    },
  ];

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  return (
    <div
      className="vw-100 vh-100 d-flex flex-column bg-dark-mode text-white"
      data-bs-theme="dark"
    >
      {/* <div className="h-10 d-flex align-items-center p-2">
        <h5>Administración de WEBTECNM</h5>
      </div> */}
      <div className="h-100 d-flex p-2 gap-2">
        <div className="w-15 d-flex flex-column justify-content-evenly align-items-end rounded bg-dark-mode-base user-side-bar">
          {configOptions.map((el, i) => (
            <NavLink
              key={i}
              /* onClick={el.activate}  */ /* role="button" */ to={el.route}
              className="w-90 d-flex align-items-center justify-content-center"
            >
              <span>
                <i className={`${el.icon} fs-4`} /> {el.name}
              </span>
            </NavLink>
          ))}
        </div>
        <div className="w-85 h-100 d-flex flex-column gap-2">
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
    </div>
  );
}

export const NavigationMenuUser = ({ tabs, mainRoute }) => {
  return (
    <div className="d-flex w-100 d-flex pb-2 gap-2 nav-menu-tabs">
      {tabs.map((el) => (
        <NavLink to={`${el.route}`} key={el.name} end>
          <i className={el.icon} />
          <span>{el.name}</span>
        </NavLink>
      ))}
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

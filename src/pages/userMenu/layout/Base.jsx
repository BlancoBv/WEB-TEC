import { useState } from "react";

import AddNoticias from "../sections/noticias/AddNoticias";
import Banners from "../sections/Banners";
import NoticiasPendientes from "../sections/NoticiasPendientes";
import { Outlet, NavLink } from "react-router-dom";

function Base() {
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
      name: "Añadir Noticia",
      route: "noticias",
    },
    { name: "Banners", activate: () => showBannersSection(), route: "banners" },
  ];

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
              <span>{el.name}</span>
            </NavLink>
          ))}
        </div>
        <div className="w-85 h-100">
          {/* {showAddNotice && <AddNoticias />}
          {showBanners && <Banners />}
          {showNoticiasPend && <NoticiasPendientes />} */}
          {/* <div className="h-90 w-100">
            <Outlet />
          </div> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export const NavigationMenuUser = ({ tabs, mainRoute }) => {
  console.log();
  return (
    <div className="d-flex w-100 d-flex pb-2 gap-2 nav-menu-tabs">
      {tabs.map((el) => (
        <NavLink to={`${el.route}`} end>
          {el.name}
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

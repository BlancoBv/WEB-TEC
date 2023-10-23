import { useState } from "react";

import AddNoticias from "../sections/AddNoticias";
import Banners from "../sections/Banners";
import NoticiasPendientes from "../sections/NoticiasPendientes";

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
    { name: "Añadir Noticia", activate: () => showNoticeSection() },
    { name: "Noticias pendientes", activate: () => showNoticiasPendientes() },
    { name: "Banners", activate: () => showBannersSection() },
  ];

  return (
    <div className="vw-100 vh-100 d-flex flex-column">
      <div className="h-10 d-flex align-items-center p-2">
        <h5>Administración de WEBTECNM</h5>
      </div>
      <div className="h-90 d-flex">
        <div className="border w-15 d-flex flex-column justify-content-evenly align-items-center">
          {configOptions.map((el, i) => (
            <span key={i} onClick={el.activate} role="button">
              {el.name}
            </span>
          ))}
        </div>
        <div className="border w-85 p-2 h-100">
          {showAddNotice && <AddNoticias />}
          {showBanners && <Banners />}
          {showNoticiasPend && <NoticiasPendientes />}
        </div>
      </div>
    </div>
  );
}

export default Base;

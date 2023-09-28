import { useState } from "react";

import AddNoticias from "../sections/AddNoticias";
import Banners from "../sections/Banners";

function Base() {
  const [showAddNotice, setShowAddNotice] = useState(false);
  const [showBanners, setShowBanners] = useState(false);
  /* const [showModal, setShowModal] = useState(false);
  const [editorContent, setEditorContent] = useState({ html: "" });
  const [body, setBody] = useState({ titulo: "", imagenPrincipal: "" });
  const [banner, setBanner] = useState({ imagen: "" });

  const handle = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBody({ ...body, [name]: value });
  };

  const saveBanner = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("/banners/crear", { imagen: banner.imagen[0] });
    } catch (error) {}
  };
  console.log(banner.imagen);
 */

  const showBannersSection = () => {
    setShowAddNotice(false);
    setShowBanners(true);
  };
  const showNoticeSection = () => {
    setShowBanners(false);
    setShowAddNotice(true);
  };
  const configOptions = [
    { name: "Añadir Noticia", activate: () => showNoticeSection() },
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
        </div>
      </div>
    </div>
  );
}

export default Base;

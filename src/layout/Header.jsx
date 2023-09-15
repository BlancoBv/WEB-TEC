import { useEffect, useState } from "react";
import LogoGob from "../img/logoheader.svg";
import LogoGobMx from "../img/placa-gob1.png";
import LogoSep from "../img/placa-gob2.png";
import LogoTec from "../img/placa_tecnm.jpg";
import Dropdown from "../components/Dropdown";

function Header() {
  const [showWhiteMenu, setShowWhiteMenu] = useState(true);
  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      const currentScroll = window.scrollY;

      if (currentScroll >= 100) {
        setShowWhiteMenu((prev) => (prev = false));
      } else {
        setShowWhiteMenu((prev) => (prev = true));
      }
    });
  }, []);

  return (
    <header className="w-100 position-fixed top-0">
      {/* Barra gobierno */}
      <div className="header w-100 d-flex justify-content-end position-relative">
        <a
          className="h-100 d-flex align-items-center position-absolute start-0 ms-2"
          href="https://www.gob.mx/"
        >
          <img src={LogoGob} width="100px" />
        </a>
        <div className="d-flex justify-content-evenly w-25">
          <a
            className="text-white  h-100 enlacesGob px-3 text-decoration-none "
            href="https://www.gob.mx/gobierno"
          >
            <p className="d-flex align-items-center h-100">Gobierno</p>
          </a>
          <a
            className="text-white  h-100 enlacesGob px-3 text-decoration-none "
            href="https://www.gob.mx/participa"
          >
            <p className="d-flex align-items-center h-100">Participa</p>
          </a>
          <a
            className="text-white  h-100 enlacesGob px-3 text-decoration-none "
            href="https://datos.gob.mx"
          >
            <p className="d-flex align-items-center h-100">Datos</p>
          </a>
          <a
            className="text-white h-100 enlacesGob px-3 text-decoration-none  "
            href="https://www.gob.mx/busqueda"
          >
            <p className="d-flex align-items-center h-100">
              <i className="fa-solid fa-magnifying-glass" />
            </p>
          </a>
        </div>
      </div>
      {/* Barra blanca */}
      <div
        className={`bg-white ${!showWhiteMenu && "hideWhiteMenu"}`}
        style={{ transition: "all ease-in-out 0.3s" }}
      >
        <a className="imageOpacity" href="https://www.gob.mx">
          <img src={LogoGobMx} />
        </a>
        <a className="imageOpacity" href="https://www.gob.mx/sep">
          <img src={LogoSep} />
        </a>
        <a className="imageOpacity" href="https://www.tecnm.mx/">
          <img src={LogoTec} />
        </a>
      </div>
      {/* Barra azul */}
      <div className="blueBackground text-white blueMenu d-flex justify-content-evenly align-items-center">
        <a className="text-decoration-none text-white" href="">
          <i className="fa-solid fa-house" />
        </a>
        <Dropdown
          title="Conocenos"
          items={[
            { item: "Antecedentes Historicos", link: "" },
            { item: "Misión", link: "" },
            { item: "Visión", link: "" },
            { item: "Valores institucionales", link: "" },
          ]}
        />
        <Dropdown
          title="Oferta Educativa"
          items={[
            { item: "Ingeniería Ambiental", link: "" },
            { item: "Ingeniería Bioquímica", link: "" },
            { item: "Ingeniería Civil", link: "" },
            { item: "Ingeniería Electromecanica ", link: "" },
            { item: "Ingeniería Industrial", link: "" },
            { item: "Ingeniería en Sistemas Computacionales", link: "" },
            { item: "Licenciatura en Administración", link: "" },
          ]}
        />
        <Dropdown
          title="Servicios"
          items={[
            { item: "Antecedentes Historicos", link: "" },
            { item: "Misión", link: "" },
            { item: "Visión", link: "" },
            { item: "Valores institucionales", link: "" },
          ]}
        />
        <Dropdown
          title="Estudiantes"
          items={[
            { item: "Titulos y cedulas", link: "" },
            { item: "Formatos", link: "" },
            { item: "SIE para estudiantes", link: "" },
          ]}
        />
        <Dropdown
          title="Docentes"
          items={[
            { item: "Documentos", link: "" },
            { item: "SIE para docentes", link: "" },
          ]}
        />
        <Dropdown
          title="Egresados"
          items={[
            { item: "Antecedentes Historicos", link: "" },
            { item: "Misión", link: "" },
            { item: "Visión", link: "" },
            { item: "Valores institucionales", link: "" },
          ]}
        />
        <a className="text-white text-decoration-none" href="">
          H. Junta Directiva
        </a>
      </div>
    </header>
  );
}

export default Header;

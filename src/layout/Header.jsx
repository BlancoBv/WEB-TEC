import { forwardRef, useEffect, useState } from "react";
import LogoGob from "../assets/img/logoheader.svg";
import LogoGobMx from "../assets/img/placa-gob1.png";
import LogoSep from "../assets/img/placa-gob2.png";
import LogoTec from "../assets/img/placa_tecnm.jpg";
import Dropdown from "../components/Dropdown";
import { Link } from "react-router-dom";

const Header = () => {
  const [showWhiteMenu, setShowWhiteMenu] = useState(true);
  /* Funcion usada para esconder la barra blanca en el header al desplazarse en el contenedor principal */
  useEffect(() => {
    const element = document.getElementById("main");
    element.addEventListener("scroll", (e) => {
      const currentScroll = element.scrollTop;

      if (currentScroll >= 100) {
        setShowWhiteMenu((prev) => (prev = false));
      } else {
        setShowWhiteMenu((prev) => (prev = true));
      }
    });
  }, []);

  return (
    <header className="w-100">
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
            title="Gobierno"
          >
            <p className="d-flex align-items-center h-100">Gobierno</p>
          </a>
          <a
            className="text-white  h-100 enlacesGob px-3 text-decoration-none "
            href="https://www.gob.mx/participa"
            title="Participación ciudadana"
          >
            <p className="d-flex align-items-center h-100">Participa</p>
          </a>
          <a
            className="text-white  h-100 enlacesGob px-3 text-decoration-none "
            href="https://datos.gob.mx"
            title="Datos Abiertos"
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
        className={`bg-white ${!showWhiteMenu && "hideWhiteMenu"} d-flex`}
        style={{ transition: "all ease-in-out 0.3s" }}
      >
        <div className="w-75">
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
        <div className="w-25 d-flex flex-column">
          <div className="h-50"></div>
          <div className="h-50">
            <Dropdown
              title="SGI"
              background="#fff"
              items={[
                {
                  item: "Formatos de requisiciones",
                  link: "https://rios.tecnm.mx/Formatos_SGC/",
                },
              ]}
            />
            {/*    <a href="">Transparencia TecNM</a>
          <a href="">Control Escolar</a> */}
          </div>
        </div>
      </div>
      {/* Barra azul */}
      <div className="blueBackground text-white blueMenu d-flex justify-content-evenly align-items-center">
        <Link className="text-decoration-none text-white" to="/">
          <i className="fa-solid fa-house" />
        </Link>
        <Dropdown
          title="Conocenos"
          items={[
            { item: "Antecedentes Historicos", link: "/antecedentes" },
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
};

export default Header;

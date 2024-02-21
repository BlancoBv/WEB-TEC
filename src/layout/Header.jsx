import { useEffect } from "react";
import LogoGob from "../assets/img/logoheader.svg";
import NavBar from "../components/NavBar";
import WhiteBar from "../components/WhiteBar";

const Header = () => {
  /* Funcion usada para esconder la barra blanca en el header al desplazarse en el contenedor principal */
  useEffect(() => {
    const element = document.getElementById("main");
    element.addEventListener("scroll", () => {
      const currentScroll = element.scrollTop;
      const whiteBar = document.getElementById("white-bar");

      if (currentScroll >= 100) {
        whiteBar.style.display = "none";
      } else {
        whiteBar.style.display = "";
      }
    });
  }, []);

  return (
    <header className="w-100">
      {/* Barra gobierno */}
      <div className="gob-bar">
        <a className="gob-image" href="https://www.gob.mx/">
          <img src={LogoGob} width="100px" />
        </a>
        <div className="gob-links">
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

      <WhiteBar />

      {/* Barra azul */}
      <NavBar />
    </header>
  );
};

export default Header;

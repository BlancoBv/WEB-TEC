import React from "react";
import LogoGob from "../img/logoheader.svg";

function Header() {
  return (
    <header className="h-20 w-100 header d-flex justify-content-end position-relative">
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
    </header>
  );
}

export default Header;

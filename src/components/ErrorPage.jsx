import React from "react";
import placaTec from "../assets/img/TecNM_logo.png";

export default function ErrorPage() {
  return (
    <div className="error-page-container">
      <div className="error-msg">
        <div>
          <img src={placaTec} alt="Logo TecNM" />
          <span>404</span>
        </div>
        <span>Página no encontrada</span>
        <a href="/" className="button-custom">
          Volver al inicio
        </a>
      </div>
      <div className="cloud-container">
        <i className="fa-solid fa-cloud" />
        <i className="fa-solid fa-cloud" />
        <i className="fa-solid fa-cloud" />
        <i className="fa-solid fa-cloud" />
        <i className="fa-solid fa-cloud" />
        <i className="fa-solid fa-cloud" />
        <i className="fa-solid fa-cloud" />
      </div>
    </div>
  );
}

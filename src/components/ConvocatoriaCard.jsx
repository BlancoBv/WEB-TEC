import React from "react";
import { urlMain } from "../axios/Axios";

function ConvocatoriaCard({ element }) {
  const launchNewPage = () => {
    window.open(`${urlMain}${element.pdf}`).focus();
  };
  return (
    <div className="convocatoria-card-container" onClick={launchNewPage}>
      <img src={`${urlMain}${element.imagen}`} />
      <div className="description-container d-flex flex-column justify-content-center align-items-center">
        <h4 className="text-center">{element.titulo}</h4>
        <i className="w-100 text-center">{element.descripcion}</i>
      </div>
    </div>
  );
}

export default ConvocatoriaCard;

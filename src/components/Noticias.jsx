import React from "react";
import useGetData from "../hooks/useGetData";
import NoticiaCard from "./NoticiaCard";
import Button from "./Button";

function Noticias() {
  const { data, isPending, error } = useGetData(
    "/blogs/obtener?estatus=aceptado&limit=3"
  );
  return (
    <div className="noticias-section">
      {!isPending && !error ? (
        <>
          {data.response.map((el, i) => (
            <NoticiaCard key={i} element={el} />
          ))}
          <Button text="Ver anteriores" />
        </>
      ) : (
        <div className="no-noticia">
          <div className="icon-container">
            <i className="fa-solid fa-newspaper primary-icon" />
            <i className="fa-solid fa-circle-xmark secondary-icon" />
          </div>
          <div className="text-center">
            <h1>Nada por aquí...</h1>
            <span>Espera a que suban contenido.</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Noticias;

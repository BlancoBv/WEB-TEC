import React from "react";
import useGetData from "../hooks/useGetData";

function NoticiasSection() {
  const { data, isPending } = useGetData("/blogs/obtener?estatus=aceptado");
  console.log(data);
  return (
    <div className="noticias-section">
      {!isPending && data.response.length > 0 ? (
        data.response.map((el, i) => <NoticiaCard key={i} element={el} />)
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

export default NoticiasSection;

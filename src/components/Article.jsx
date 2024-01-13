import React from "react";
import useGetData from "../hooks/useGetData";

function Article({ ruta }) {
  const { data, isPending } = useGetData(`/articulos/obtener/${ruta}`);

  return (
    <>
      {!isPending && data.response ? (
        <div className="article-container">
          <h1>{data.response.titulo}</h1>
          <div
            className="article-items"
            dangerouslySetInnerHTML={{ __html: data.response.contenido }}
          />
        </div>
      ) : (
        <div className="article-container">Sin contenido</div>
      )}{" "}
    </>
  );
}

export default Article;

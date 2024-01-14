import React from "react";
import useGetData from "../hooks/useGetData";

function Article({ ruta }) {
  const { data, isPending } = useGetData(`/articulos/obtener/${ruta}`);
  const content = !isPending ? JSON.parse(data.response.contenido) : {};

  console.log(content);
  return (
    <>
      {!isPending && data.response ? (
        <>
          <div className="article-header">
            <img className="article-background" src={content.background} />
            <img className="article-foreground" src={content.foreground} />
            <h1 className="article-title">{data.response.titulo}</h1>
          </div>
          <div
            className="article-items"
            dangerouslySetInnerHTML={{ __html: content.contenidoPrincipal }}
          />
        </>
      ) : (
        <div className="article-container">Sin contenido</div>
      )}{" "}
    </>
  );
}

export default Article;

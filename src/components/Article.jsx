import React from "react";
import useGetData from "../hooks/useGetData";

function Article({ ruta }) {
  const { data, isPending, error } = useGetData(`/articulos/obtener/${ruta}`);

  return (
    <>
      {!isPending && !error && <Success data={data.response} />}
      {!isPending && error && (
        <div className="article-no-content">Sin contenido</div>
      )}
    </>
  );
}
const Success = ({ data }) => {
  const { background, foreground, contenidoPrincipal } = JSON.parse(
    data.contenido
  );
  return (
    <>
      <div className="article-header">
        <img className="article-background" src={background} />
        <img className="article-foreground" src={foreground} />
        <h1 className="article-title">{data.titulo}</h1>
      </div>
      <div
        className="article-items"
        dangerouslySetInnerHTML={{ __html: contenidoPrincipal }}
      />
    </>
  );
};

export default Article;

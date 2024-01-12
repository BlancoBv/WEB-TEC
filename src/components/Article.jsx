import React from "react";
import useGetData from "../hooks/useGetData";

function Article({ ruta }) {
  const { data, isPending } = useGetData(`/articulos/obtener/${ruta}`);

  return (
    <>
      {!isPending && data.response ? (
        <div>
          <h1>{data.response.titulo}</h1>
          <div dangerouslySetInnerHTML={{ __html: data.response.contenido }} />
        </div>
      ) : (
        <div>Sin contenido</div>
      )}{" "}
    </>
  );
}

export default Article;

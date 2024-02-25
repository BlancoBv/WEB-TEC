import React from "react";
import useGetData from "../../hooks/useGetData";
import Loader from "../../components/Loader";
import NoticiaCard from "../../components/NoticiaCard";

function AllNoticias() {
  const { data, isPending, error } = useGetData(
    "/blogs/obtener?estatus=aceptado&mostrarSinVigencia=true"
  );
  return (
    <div className="search-label-container">
      <h3>Mostrando todas las noticias</h3>
      {!isPending && !error && (
        <div className="w-100 h-100 d-flex flex-wrap justify-content-evenly">
          {data.response.map((el) => (
            <NoticiaCard element={el} key={el.idblog} />
          ))}
        </div>
      )}
      {isPending && (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default AllNoticias;

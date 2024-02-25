import React from "react";
import useGetData from "../hooks/useGetData";
import NoticiaCard from "./NoticiaCard";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import LoadingContent from "./LoadingContent";

function Noticias() {
  const { data, isPending, error } = useGetData(
    "/blogs/obtener?estatus=aceptado&limit=4"
  );
  return (
    <div className="noticias-section">
      {!isPending && !error && (
        <>
          <div className="noticias-container">
            {data.response.map((el, i) => (
              <NoticiaCard key={i} element={el} />
            ))}
          </div>
          <NavLink to="todas-noticias" className="button-custom" reloadDocument>
            Ver más noticias
          </NavLink>
        </>
      )}
      {!isPending && error && (
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

      {isPending && (
        <div className="w-100 d-flex justify-content-evenly flex-wrap">
          <div className="noticia-card">
            <h4 style={{ height: "30px", width: "100%" }}>
              <LoadingContent />
            </h4>
            <div style={{ height: "10rem", width: "100%" }}>
              <LoadingContent />
            </div>
            <div className="w-100 d-flex justify-content-start">
              <div style={{ height: "40px", width: "100px" }}>
                <LoadingContent />
              </div>
            </div>
          </div>
          <div className="noticia-card">
            <h4 style={{ height: "30px", width: "100%" }}>
              <LoadingContent />
            </h4>
            <div style={{ height: "10rem", width: "100%" }}>
              <LoadingContent />
            </div>
            <div className="w-100 d-flex justify-content-start">
              <div style={{ height: "40px", width: "100px" }}>
                <LoadingContent />
              </div>
            </div>
          </div>
          <div className="noticia-card">
            <h4 style={{ height: "30px", width: "100%" }}>
              <LoadingContent />
            </h4>
            <div style={{ height: "10rem", width: "100%" }}>
              <LoadingContent />
            </div>
            <div className="w-100 d-flex justify-content-start">
              <div style={{ height: "40px", width: "100px" }}>
                <LoadingContent />
              </div>
            </div>
          </div>
          <div className="noticia-card">
            <h4 style={{ height: "30px", width: "100%" }}>
              <LoadingContent />
            </h4>
            <div style={{ height: "10rem", width: "100%" }}>
              <LoadingContent />
            </div>
            <div className="w-100 d-flex justify-content-start">
              <div style={{ height: "40px", width: "100px" }}>
                <LoadingContent />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Noticias;

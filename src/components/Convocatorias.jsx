import React from "react";
import useGetData from "../hooks/useGetData";
import ConvocatoriaCard from "./ConvocatoriaCard";
import LoadingContent from "./LoadingContent";

function Convocatorias() {
  const { data, isPending, error } = useGetData("/convocatorias/obtener");
  console.log({ data, isPending, error });
  return (
    <div className="convocatorias-section">
      {!isPending && !error && <Success convocatorias={data.response} />}
      {!isPending && error && (
        <div className="no-convocatoria">
          <div className="icon-container">
            <i className="fa-solid fa-file-lines primary-icon" />
            <i className="fa-solid fa-circle-xmark secondary-icon" />
          </div>
          <div className="text-center">
            <h1>Nada por aquí...</h1>
            <span>Espera a que suban contenido.</span>
          </div>
        </div>
      )}
      {isPending && (
        <>
          <div style={{ width: "300px", height: "400px" }}>
            <LoadingContent />
          </div>
          <div style={{ width: "300px", height: "400px" }}>
            <LoadingContent />
          </div>
          <div style={{ width: "300px", height: "400px" }}>
            <LoadingContent />
          </div>
          <div style={{ width: "300px", height: "400px" }}>
            <LoadingContent />
          </div>
        </>
      )}
    </div>
  );
}
const Success = ({ convocatorias }) => {
  return (
    <>
      {convocatorias.map((el) => (
        <ConvocatoriaCard element={el} key={el.idconvocatoria} />
      ))}
    </>
  );
};

export default Convocatorias;

import React from "react";
import useGetData from "../../../../hooks/useGetData";
import Tabla from "../../../../components/Tabla";
import Loader from "../../../../components/Loader";

function ListaPermisos() {
  const { data, isPending, error } = useGetData("/auth/permisos");
  return (
    <>
      <div className="h-100 rounded bg-dark-mode-base p-2">
        {!isPending && <Success data={data.response} error={error} />}
        {isPending && (
          <div className="h-100 w-100 d-flex align-items-center justify-content-center">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
}
const Success = ({ data, error }) => {
  const columnas = [
    { name: "ID permiso", selector: (row) => row.idpermiso },
    { name: "Permiso", selector: (row) => row.permiso },
    { name: "Descripción", selector: (row) => row.descripcion },
  ];
  return <Tabla data={data} error={error} columnas={columnas} />;
};

export default ListaPermisos;

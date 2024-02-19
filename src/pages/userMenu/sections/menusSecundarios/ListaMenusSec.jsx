import React, { useState } from "react";
import useGetData from "../../../../hooks/useGetData";

function ListaMenusSec() {
  const [actualizador, setActualizador] = useState(false);
  const { data, isPending, error } = useGetData(
    "/menu-blanco/obtener",
    actualizador
  );

  return <div>ListaMenusSec</div>;
}

export default ListaMenusSec;

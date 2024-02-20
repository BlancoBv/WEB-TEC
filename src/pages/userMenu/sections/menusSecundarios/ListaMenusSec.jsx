import React, { useState } from "react";
import useGetData from "../../../../hooks/useGetData";
import Tabla, { TablaDropdown } from "../../../../components/Tabla";
import format from "../../../../assets/format";

function ListaMenusSec() {
  const [actualizador, setActualizador] = useState(false);
  const { data, isPending, error } = useGetData(
    "/menu-blanco/obtener",
    actualizador
  );

  return <div>{!isPending && <Success data={data.response} />}</div>;
}
const Success = ({ data }) => {
  const columnas = {
    columnas: [
      {
        name: "Ultima vez actualizado",
        selector: (row) => format.formatFecha(row.updatedAt, "numeric"),
      },
      { name: "Titulo", selector: (row) => row.nombre },
      { name: "Ruta", selector: (row) => row.url },
    ],
    dropdown: {
      condition: (row) => row.white_submenus.length > 0,
      target: "white_submenus",
      columnas: [
        {
          name: "Ultima vez actualizado",
          selector: (row) => format.formatFecha(row.updatedAt, "numeric"),
        },
        { name: "Titulo", selector: (row) => row.nombre },
        { name: "Ruta", selector: (row) => row.url },
      ],
    },
  };
  return (
    <TablaDropdown
      data={data}
      columnas={columnas.columnas}
      dropdownOptions={columnas.dropdown}
    />
  );
};

export default ListaMenusSec;

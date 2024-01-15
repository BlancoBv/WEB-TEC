import React from "react";
import NoContent from "./NoContent";

function Tabla({ data, columnas, onClickAction, onContextAction }) {
  return (
    <>
      {data.length > 0 && (
        <table className="w-100 table table-hover">
          <thead>
            <tr>
              {columnas.map((encabezado) => (
                <th>{encabezado.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              return (
                <tr
                  onClick={onClickAction ? () => onClickAction(row) : undefined}
                  onContextMenu={
                    onContextAction ? (e) => onContextAction(e, row) : undefined
                  }
                  role="button"
                >
                  {columnas.map((target) => (
                    <td>{target.selector(row)}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {data.length <= 0 && <NoContent />}
    </>
  );
}

export default Tabla;

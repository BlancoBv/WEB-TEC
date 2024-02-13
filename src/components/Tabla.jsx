import React from "react";
import NoContent from "./NoContent";

function Tabla({ data, columnas, onClickAction, onContextAction, error }) {
  return (
    <div className="overflow-auto h-100 w-100">
      {!error && (
        <table className="tabla">
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
      {error && <NoContent />}
    </div>
  );
}

export default Tabla;

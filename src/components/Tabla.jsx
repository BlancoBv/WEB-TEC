import React from "react";
import NoContent from "./NoContent";
import { AccordionTableMenus } from "./Accordion";

function Tabla({ data, columnas, onClickAction, onContextAction, error }) {
  return (
    <div className="overflow-auto h-100 w-100">
      {!error && (
        <table className="tabla">
          <thead>
            <tr>
              {columnas.map((encabezado, index) => (
                <th key={index}>{encabezado.name}</th>
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
export const TablaDropdown = ({
  data,
  columnas,
  onClickAction,
  onContextAction,
  onContextActionSecondary,
  error,
  dropdownOptions,
}) => {
  return (
    <div className="overflow-auto h-100 w-100">
      <table className="tabla">
        <thead>
          <tr>
            {columnas.map((encabezado, index) => (
              <th key={index}>{encabezado.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) =>
            dropdownOptions.condition(row) ? (
              <AccordionTableMenus
                element={row}
                columnas={columnas}
                subcolumnas={dropdownOptions.columnas}
                subTarget={dropdownOptions.target}
                onContextAction={onContextAction}
                onContextActionSecondary={onContextActionSecondary}
              />
            ) : (
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
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
export default Tabla;

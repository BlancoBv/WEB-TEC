import React, { useState } from "react";

function Accordion() {
  return (
    <div className="accordion-custom">
      <label>
        Click me <input type="checkbox" />
        <div className="panel">Ola XD</div>
      </label>
    </div>
  );
}

export const AccordionTableMenus = ({
  element,
  showContextMenu,
  showContextMenuSecondary,
  columnas,
  subcolumnas,
  subTarget,
}) => {
  const [isShow, setIsShow] = useState(false);
  const activatePanel = (e) => {
    const { target } = e;
    const element = target.parentNode.nextSibling;
    if (element.style.display !== "table-row") {
      element.style.display = "table-row";
      setIsShow(true);
    } else {
      element.style.display = "none";
      setIsShow(false);
    }
  };
  console.log(element[subTarget]);
  return (
    <>
      <tr
        className="accordion-custom"
        onClick={activatePanel}
        onContextMenu={(e) => showContextMenu(e, element)}
      >
        {columnas.map((target, i) => (
          <td key={i}>{target.selector(element)}</td>
        ))}
        <i
          className={`fa-solid fa-caret-${
            isShow ? "up" : "down"
          } position-absolute`}
          style={{
            top: "50%",
            transform: "translate(0%,-50%)",
            right: "5px",
          }}
        />
      </tr>

      <tr className="panel">
        <td colSpan={3}>
          <table className="w-100">
            <tbody>
              <tr>
                {/*  {subcolumnas.map((target) => (
                  <td>{target.selector(element[subTarget])}</td>
                ))} */}
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </>
  );
};
export default Accordion;

import React, { useState } from "react";
import useGetData from "../../../../hooks/useGetData";
import Loader from "../../../../components/Loader";
import Modal from "../../../../components/Modal";
import { urlMain } from "../../../../axios/Axios";
import { Scrollbar } from "react-scrollbars-custom";
import NoticiaContent from "../../../../components/NoticiaContent";
import ContextualMenu, { show } from "../../../../components/ContextualMenu";
import { AccordionTableMenus } from "../../../../components/Accordion";

function ListaMenus() {
  const [filter, setFilter] = useState({
    estatus: "aceptado",
    vigencia: "true",
  });
  const [relativeData, setRelativeData] = useState({});
  const [showModal, setShowModal] = useState({ status: false, data: "" });

  const { data, isPending, error } = useGetData("/categorias/obtener");

  const display = (event, element) => {
    setRelativeData(element);
    show({ event });
  };
  const contextMenuOptions = [
    {
      content: "Editar",
      icon: "fa-pen-to-square",
      action: () => {
        setShowModal({ status: true, title: "Editar etiqueta", type: "edit" });
      },
    },
    {
      content: "Añadir subcategoria",
      icon: "fa-pen-to-square",
      action: () => {
        setShowModal({ status: true, title: "Editar etiqueta", type: "edit" });
      },
      disabled:
        relativeData.hasOwnProperty("dropcollapse") &&
        !relativeData.dropcollapse,
    },
    { content: "separator" },
    {
      content: "Eliminar",
      style: "text-danger",
      icon: "fa-trash-can",
      action: () => setShowConfirm(true),
    },
  ];

  return (
    <div className="h-100 w-100 d-flex flex-column gap-2">
      <ContextualMenu elements={contextMenuOptions} />
      <Modal
        show={showModal.status}
        close={() => setShowModal({ status: false, data: "" })}
        title={"editando"}
        darkMode={true}
        size="md"
      ></Modal>
      <div className="flex-grow-1 bg-dark-mode-base rounded p-2 d-flex">
        {!isPending && (
          <Success
            data={data.response}
            modalState={{ showModal, setShowModal }}
            showContextMenu={display}
          />
        )}
        {isPending && <Loader />}
      </div>
    </div>
  );
}

const Success = ({ data, showContextMenu }) => {
  return (
    <>
      <div className="w-100">
        <table className="w-100 tabla">
          <thead>
            <tr>
              <th>Ultima actualización</th>
              <th>Titulo</th>
              <th>Ruta</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el) => {
              if (el.dropcollapse) {
                return (
                  <AccordionTableMenus
                    element={el}
                    targets={["updatedAt", "categoria", "ruta"]}
                    subcategoriaTargets={["updatedAt", "subcategoria", "ruta"]}
                    showContextMenu={showContextMenu}
                  />
                );
              }
              return (
                <tr
                  key={el.idcategoria}
                  title={el.titulo}
                  onContextMenu={(e) => showContextMenu(e, el)}
                >
                  <td>{el.updatedAt}</td>
                  <td>{el.categoria}</td>
                  <td>{el.ruta || "---"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListaMenus;

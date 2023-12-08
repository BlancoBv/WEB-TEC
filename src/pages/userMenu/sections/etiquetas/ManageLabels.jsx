import React, { useContext, useState } from "react";
import useGetData from "../../../../hooks/useGetData";
import ContextualMenu, { show } from "../../../../components/ContextualMenu";
import Modal, { ModalBottom, ModalConfirm } from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Axios from "../../../../axios/Axios";
import { AlertsContexts } from "../../IndexMenu";

function ManageLabels() {
  const [body, setBody] = useState({});
  const [actualizador, setActualizador] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [relativeData, setRelativeData] = useState({});
  const [showModal, setShowModal] = useState({
    status: false,
    title: "",
    type: "add",
  });

  const { showSuccess, showError } = useContext(AlertsContexts);
  const { data, isPending } = useGetData("/etiquetas/obtener", actualizador);

  const display = (event, element) => {
    setRelativeData(element);
    show({ event });
  };

  const handle = (e) => {
    const { name, value } = e.target;
    setBody({ ...body, [name]: value });
  };

  const saveLabel = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("/etiquetas/insertar", body);
      showSuccess();
      setBody({});
      setActualizador(!actualizador);
    } catch (error) {
      showError();
    }
  };
  const updateLabel = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(
        `/etiquetas/actualizarxidetiqueta/${relativeData.idetiqueta}`,
        body
      );
      showSuccess();
      setBody({});
      setActualizador(!actualizador);
    } catch (error) {
      showError();
    }
  };
  const deleteLabel = async () => {
    try {
      await Axios.delete(
        `/etiquetas/eliminarxidetiqueta/${relativeData.idetiqueta}`
      );
      showSuccess();
      setActualizador(!actualizador);
    } catch (error) {
      showError();
    }
  };

  const contextMenuOptions = [
    {
      content: "Editar",
      icon: "fa-pen-to-square",
      action: () => {
        setBody({ etiqueta: relativeData.etiqueta });
        setShowModal({ status: true, title: "Editar etiqueta", type: "edit" });
      },
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
    <>
      <ContextualMenu elements={contextMenuOptions} />
      <Modal
        title={showModal.title}
        size="sm"
        show={showModal.status}
        darkMode={true}
        close={() => {
          setBody({});
          setShowModal({ status: false, title: "", type: "add" });
        }}
      >
        <form
          className="w-100 h-100 d-flex flex-column"
          onSubmit={showModal.type === "add" ? saveLabel : updateLabel}
        >
          <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <Input
              label="Nombre de la nueva etiqueta"
              placeholder="Etiqueta"
              name="etiqueta"
              value={body}
              handle={handle}
              required={true}
            />
          </div>
          <ModalBottom>
            <button type="submit">Guardar</button>
          </ModalBottom>
        </form>
      </Modal>
      <ModalConfirm
        show={showConfirm}
        darkMode={true}
        close={() => setShowConfirm(false)}
        action={deleteLabel}
      />
      <div className="w-100 h-100 d-flex flex-column gap-2">
        <div className="h-10">
          <span
            className="h-100 fit-content-width d-flex align-items-center gap-2 bg-dark-mode-base rounded p-2"
            role="button"
            title="Añadir etiqueta"
            onClick={() =>
              setShowModal({
                status: true,
                title: "Añadir etiqueta",
                type: "add",
              })
            }
          >
            <i className="fa-solid fa-square-plus fs-1" /> Añadir etiqueta
          </span>
        </div>
        <div className="flex-grow-1 p-2 bg-dark-mode-base rounded">
          {!isPending && (
            <Success data={data.response} displayContextMenu={display} />
          )}
        </div>
      </div>
    </>
  );
}
const Success = ({ data, displayContextMenu }) => {
  return (
    <div className="w-100">
      <table className="w-100 table table-hover">
        <thead>
          <tr>
            <th>Ultima actualización</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el) => (
            <tr
              key={el.idetiqueta}
              title={el.etiqueta}
              role="button"
              onContextMenu={(e) => displayContextMenu(e, el)}
              //onClick={() => setRelativeData(el)}
            >
              <td>{el.updatedAt}</td>
              <td>{el.etiqueta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ManageLabels;

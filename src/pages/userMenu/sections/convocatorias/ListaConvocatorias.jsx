import React, { useState, useContext } from "react";
import useGetData from "../../../../hooks/useGetData";
import Axios from "../../../../axios/Axios";
import { AlertsContexts } from "../../IndexMenu";
import ContextualMenu, { show } from "../../../../components/ContextualMenu";
import Modal from "../../../../components/Modal";
import Input, { InputTextArea } from "../../../../components/Input";
import ScrollbarCustom from "../../../../components/ScrollbarCustom";

function ListaConvocatorias() {
  const [relativeData, setRelativeData] = useState({});
  const [actualizador, setActualizador] = useState(false);
  const [showModal, setShowModal] = useState({
    status: false,
    title: "",
    type: "",
  });

  const [bodyTitles, setBodyTitles] = useState({});

  const { showSuccess, showError } = useContext(AlertsContexts);
  const { data, isPending } = useGetData(
    "/convocatorias/obtener",
    actualizador
  );

  const display = (event, element) => {
    setRelativeData(element);
    show({ event });
  };

  const deleteData = async () => {
    try {
      await Axios.delete(
        `/convocatorias/eliminarxidconvocatoria/${relativeData.idconvocatoria}`
      );
      showSuccess();
      setActualizador(!actualizador);
    } catch (error) {
      showError();
    }
  };
  const updateTitles = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(
        `/convocatorias/actualizardatosxidconvocatoria/${relativeData.idconvocatoria}`,
        bodyTitles
      );
      showSuccess();
      setActualizador(!actualizador);
    } catch (error) {}
  };

  const handle = (e, setVariable, variable) => {
    const { name, value } = e.target;
    setVariable({ ...variable, [name]: value });
  };

  const contextMenuOptions = [
    {
      content: "Editar titulo o descripción",
      action: () => {
        setBodyTitles({
          titulo: relativeData.titulo,
          fecha: relativeData.fecha,
          descripcion: relativeData.descripcion,
        });
        setShowModal({ status: true, title: "Editar titulos", type: "titles" });
      },
    },
    {
      content: "Editar archivos",

      action: () =>
        setShowModal({ status: true, title: "Editar archivos", type: "files" }),
    },
    { content: "separator" },
    {
      content: "Eliminar",
      icon: "fa-trash-can",
      style: "text-danger",
      action: deleteData,
    },
  ];

  return (
    <div>
      <ContextualMenu elements={contextMenuOptions} />
      <Modal
        title={showModal.title}
        darkMode={true}
        size="sm"
        show={showModal.title}
        close={() => setShowModal({ status: false, title: "" })}
      >
        {showModal.type === "titles" && (
          <form
            className="w-100 h-100 d-flex flex-column justify-content-center align-items-center"
            onSubmit={updateTitles}
          >
            <div className="w-75">
              <Input
                label="Titulo de la convocatoria"
                name="titulo"
                value={bodyTitles}
                required={true}
                handle={(e) => handle(e, setBodyTitles, bodyTitles)}
              />
            </div>
            <div className="w-75 h-50 mb-3">
              <InputTextArea
                label="Descripción de la convocatoria"
                name="descripcion"
                value={bodyTitles}
                required={true}
                handle={(e) => handle(e, setBodyTitles, bodyTitles)}
              />
            </div>

            <div className="w-100 d-flex justify-content-end border-top">
              <button type="submit">Guardar</button>
            </div>
          </form>
        )}
      </Modal>
      {!isPending && <Success data={data.response} display={display} />}
    </div>
  );
}

const Success = ({ data, display }) => {
  return (
    <div className="w-100">
      <table className="w-100 table table-hover">
        <thead>
          <tr>
            <th>Ultima actualización</th>
            <th>Titulo</th>
            <th>Descripción</th>
            <th>Etiquetas</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el) => (
            <tr
              key={el.idconvocatoria}
              title={el.titulo}
              role="button"
              onContextMenu={(e) => display(e, el)}
              //onClick={() => setRelativeData(el)}
            >
              <td>{el.updatedAt}</td>
              <td>{el.titulo}</td>
              <td>{el.descripcion}</td>
              <td>{el.imagen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ListaConvocatorias;

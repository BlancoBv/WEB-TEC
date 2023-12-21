import React, { useState } from "react";
import useGetData from "../../../../hooks/useGetData";
import Loader from "../../../../components/Loader";
import Modal from "../../../../components/Modal";
import { urlMain } from "../../../../axios/Axios";
import { Scrollbar } from "react-scrollbars-custom";
import NoticiaContent from "../../../../components/NoticiaContent";

function ListaMenus() {
  const [filter, setFilter] = useState({
    estatus: "aceptado",
    vigencia: "true",
  });
  const [showModal, setShowModal] = useState({ status: false, data: "" });

  const { data, isPending, error } = useGetData("/categorias/obtener");

  const handle = (e) => {
    const { value, name } = e.target;
    setFilter({ ...filter, [name]: value });
  };
  console.log(data);
  return (
    <div className="h-100 w-100 d-flex flex-column gap-2">
      <Modal
        show={showModal.status}
        close={() => setShowModal({ status: false, data: "" })}
        title={showModal.data.titulo}
        darkMode={true}
        size="md"
      >
        <NoticiaContent data={showModal.data} />
      </Modal>
      <div className="flex-grow-1 bg-dark-mode-base rounded p-2 d-flex">
        {!isPending && (
          <Success
            data={data.response}
            modalState={{ showModal, setShowModal }}
          />
        )}
        {isPending && <Loader />}
      </div>
    </div>
  );
}

const Success = ({ data, modalState }) => {
  const { showModal, setShowModal } = modalState;
  const setRelativeData = (element) => {
    setShowModal({ status: true, data: element });
  };
  return (
    <>
      <div className="w-100">
        <table className="w-100 table table-hover">
          <thead>
            <tr>
              <th>Ultima actualización</th>
              <th>Titulo</th>
              <th>Ruta</th>
            </tr>
          </thead>
          <tbody>
            {/*  {datos.map((el) => (
            <tr key={el.idblog}>
              <td>{el.usuario}</td>
              <td>{format.formatFechaDB(el.updatedAt)}</td>
              <td>{format.formatTextoMayusPrimeraLetra(el.estatus)}</td>

              <td>
                <b>{el.titulo}</b>
              </td>
              <td>{el.etiquetas}</td>

              <td>
                <span className="w-100 h-100 d-flex justify-content-evenly">
                  <button title="Previsualizar">
                    <i className="fa-solid fa-eye" />
                  </button>
                  <button title="Editar">
                    <i className="fa-solid fa-pen-to-square" />
                  </button>
                  <button
                    title="Más configuraciones"
                    onClick={() => showAjustes(el)}
                  >
                    <i className="fa-solid fa-gear" />
                  </button>
                </span>
              </td>
            </tr>
          ))} */}
            {data.map((el) => (
              <tr
                key={el.idblog}
                title={el.titulo}
                role="button"
                //onClick={() => setRelativeData(el)}
              >
                <td>{el.updatedAt}</td>
                <td>{el.categoria}</td>
                <td>{el.ruta || "---"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListaMenus;

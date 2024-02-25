import React, { useState } from "react";
import useGetData from "../../../../hooks/useGetData";
import Loader from "../../../../components/Loader";
import Modal from "../../../../components/Modal";
import NoticiaContent from "../../../../components/NoticiaContent";
import Tabla from "../../../../components/Tabla";
import format from "../../../../assets/format";

function ListaNoticias() {
  const [filter, setFilter] = useState({
    estatus: "aceptado",
    vigencia: "true",
  });
  const [showModal, setShowModal] = useState({ status: false, data: "" });

  const { data, isPending, error } = useGetData(
    `/blogs/obtener?estatus=${filter.estatus}&mostrarSinVigencia=${filter.vigencia}`
  );

  const handle = (e) => {
    const { value, name } = e.target;
    setFilter({ ...filter, [name]: value });
  };
  return (
    <div className="h-100 w-100 d-flex flex-column">
      <Modal
        show={showModal.status}
        close={() => setShowModal({ status: false, data: "" })}
        title={showModal.data.titulo}
        darkMode={true}
        size="md"
      >
        <NoticiaContent data={showModal.data} />
      </Modal>
      <div className="d-flex w-100 gap-2 h-10 align-items-center">
        <div className="w-150px">
          <select
            className="form-select"
            value={filter.vigencia}
            name="vigencia"
            onChange={handle}
          >
            <option value="false">Solo vigentes</option>
            <option value="true">Todas</option>
          </select>
        </div>
        <div className="w-150px">
          <select
            className="form-select"
            value={filter.estatus}
            onChange={handle}
            name="estatus"
          >
            <option value="aceptado">Aceptadas</option>
            <option value="rechazado">Rechazadas</option>
          </select>
        </div>
      </div>
      <div className="h-90 bg-dark-mode-base rounded p-2 d-flex">
        {!isPending && (
          <Success
            data={data.response}
            modalState={{ setShowModal }}
            error={error}
          />
        )}
        {isPending && <Loader />}
      </div>
    </div>
  );
}
const Success = ({ data, modalState, error }) => {
  const { setShowModal } = modalState;
  const setRelativeData = (element) => {
    setShowModal({ status: true, data: element });
  };

  const columnas = [
    {
      name: "Ultima vez actualizado",
      selector: (row) => format.formatFecha(row.updatedAt, "numeric"),
    },
    { name: "Titulo", selector: (row) => row.titulo },
    { name: "Estatus", selector: (row) => row.estatus },
    {
      name: "Etiquetas",
      selector: (row) => row.etiquetas.map((el) => el.etiqueta).join(", "),
    },
  ];

  return (
    <>
      <div className="w-100">
        <Tabla
          columnas={columnas}
          data={data}
          onClickAction={setRelativeData}
          error={error}
        />
      </div>
    </>
  );
};

export default ListaNoticias;

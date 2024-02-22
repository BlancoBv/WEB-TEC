import React, { useState, useContext } from "react";
import Modal, { ModalBottom } from "../../../../components/Modal";
import Input, { InputSelect } from "../../../../components/Input";
import Button from "../../../../components/Button";
import useGetData from "../../../../hooks/useGetData";
import Axios from "../../../../axios/Axios";
import { AlertsContexts } from "../../IndexMenu";
import Tabla from "../../../../components/Tabla";
import format from "../../../../assets/format";
import Loader from "../../../../components/Loader";

function ListaUsuarios() {
  const { showSuccess, showError } = useContext(AlertsContexts);
  const [showModal, setShowModal] = useState(false);
  const [actualizador, setActualizador] = useState(false);
  const [body, setBody] = useState({});
  const { data, isPending, error } = useGetData("/auth/usuarios", actualizador);

  const permisos = useGetData("/auth/roles");
  const handle = (e) => {
    const { name, value } = e.target;
    setBody((prev) => ({ ...prev, [name]: value }));
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("/auth/crear-usuario", body);
      showSuccess();
      setBody({});
    } catch (error) {
      showError();
    }
  };
  console.log(permisos);
  return (
    <div className="h-100 w-100 ">
      <Modal
        title="Añadir usuario"
        show={showModal}
        close={() => setShowModal(false)}
        size="md"
      >
        <form className="d-flex flex-column w-100 h-100" onSubmit={addUser}>
          <div className="flex-grow-1">
            <Input
              label="Nombre de usuario"
              placeholder="Administrador@1"
              name="usuario"
              handle={handle}
              value={body}
              required
            />
            <Input
              label="Nombres"
              placeholder="Juan"
              name="nombres"
              handle={handle}
              value={body}
              required
            />
            <Input
              label="Apellido Paterno"
              name="apepat"
              handle={handle}
              value={body}
              required
            />
            <Input
              label="Apellido Materno"
              name="apemat"
              handle={handle}
              value={body}
              required
            />
            <Input
              label="Contraseña"
              name="password"
              handle={handle}
              value={body}
              required
            />
            <InputSelect
              label="Rol"
              value={body}
              name="rol"
              handle={handle}
              required
            >
              {!permisos.isPending &&
                permisos.data.response.map((el) => (
                  <option value={el.rol} key={el.rol}>
                    {el.rol}
                  </option>
                ))}
            </InputSelect>
          </div>
          <ModalBottom>
            <Button text="Guardar" type="submit" />
          </ModalBottom>
        </form>
      </Modal>
      <div className="h-10">
        <span
          className="h-100 fit-content-width d-flex align-items-center gap-2 "
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
      <div className="bg-dark-mode-base rounded p-2 h-90">
        {!isPending && <Success data={data.response} error={error} />}
        {isPending && (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}

const Success = ({ data, error }) => {
  const columnas = [
    {
      name: "Nombre de usuario",
      selector: (row) => format.formatFecha(row.updatedAt, "numeric"),
    },
    { name: "Nombre de usuario", selector: (row) => row.usuario },
    { name: "Nombres", selector: (row) => row.nombres },
    { name: "Apellido paterno", selector: (row) => row.apepat },
    { name: "Apellido materno", selector: (row) => row.apemat },
    { name: "Rol", selector: (row) => row.rol },
  ];
  return <Tabla data={data} columnas={columnas} error={error} />;
};

export default ListaUsuarios;

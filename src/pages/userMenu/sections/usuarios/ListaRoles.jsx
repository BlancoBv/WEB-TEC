import React, { useState, useContext } from "react";
import useGetData from "../../../../hooks/useGetData";
import Tabla from "../../../../components/Tabla";
import Modal, { ModalBottom, ModalConfirm } from "../../../../components/Modal";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import Axios from "../../../../axios/Axios";
import { AlertsContexts } from "../../IndexMenu";
import ContextualMenu, { show } from "../../../../components/ContextualMenu";
import ScrollbarCustom from "../../../../components/ScrollbarCustom";

function ListaRoles() {
  const { showSuccess, showError } = useContext(AlertsContexts);
  const [actualizador, setActualizador] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAddPerms, setShowAddPerms] = useState(false);
  const [body, setBody] = useState({});
  const [relativeData, setRelativeData] = useState({});
  const { data, isPending, error } = useGetData("/auth/roles", actualizador);
  const permisos = useGetData("/auth/permisos", actualizador);

  const handle = (e) => {
    const { name, value } = e.target;
    setBody((prev) => ({ ...prev, [name]: value }));
  };
  const display = (event, el) => {
    setRelativeData(el);
    show({ event });
  };

  const addRole = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("/auth/crear-rol", body);
      showSuccess();
      setActualizador(!actualizador);
      setBody({});
    } catch (error) {
      showError();
    }
  };
  const deleteRole = async () => {
    try {
      await Axios.delete(`/auth/eliminar-rol/${relativeData.rol}`);
      showSuccess();
      setActualizador(!actualizador);
    } catch (error) {
      showError();
    }
  };
  const linkPerms = async () => {
    try {
      await Axios.put("/auth/asociar-rol-permiso", body);
      showSuccess();
      setBody({});
      setActualizador(!actualizador);
    } catch (error) {
      showError();
    }
  };
  const contextMenuOptions = [
    {
      content: "Asociar Permisos",
      icon: "fa-square-plus",
      action: () => {
        setBody({ rol: relativeData.rol, permisos: [] });
        setShowAddPerms(true);
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
  console.log(body);
  return (
    <>
      <ModalConfirm
        show={showConfirm}
        close={() => setShowConfirm(false)}
        action={deleteRole}
      />
      <ContextualMenu elements={contextMenuOptions} />
      <Modal
        size="sm"
        show={showModal}
        close={() => setShowModal(false)}
        title="Añadir rol"
      >
        <form className="h-100 w-100 d-flex flex-column" onSubmit={addRole}>
          <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <Input
              label="Nombre del rol"
              placeholder="Editor"
              name="rol"
              value={body}
              handle={handle}
            />
          </div>
          <ModalBottom>
            <Button text="Guardar" type="submit" />
          </ModalBottom>
        </form>
      </Modal>
      <Modal
        title="Asignar permisos"
        show={showAddPerms}
        close={() => setShowAddPerms(false)}
        size="md"
      >
        <div className="h-100 w-100 d-flex flex-column">
          <label>
            Permisos a Asignar
            <input
              className="form-control"
              readOnly
              value={
                body.hasOwnProperty("permisos") &&
                body["permisos"].map((el) => el.nombre).join(", ")
              }
              disabled
            />
          </label>
          <div className="flex-grow-1 p-2">
            <ScrollbarCustom>
              {!permisos.isPending &&
                permisos.data.response.map((el) => (
                  <div className="w-100 d-flex justify-content-evenly">
                    <span>{el.permiso}</span>
                    <button
                      onClick={() =>
                        setBody((prev) => ({
                          ...prev,
                          permisos: [
                            ...prev.permisos,
                            { nombre: el.permiso, idPermiso: el.idpermiso },
                          ],
                        }))
                      }
                      disabled={
                        body.hasOwnProperty("permisos") &&
                        body["permisos"].some(
                          (perm) => perm.idPermiso === el.idpermiso
                        )
                      }
                    >
                      <i className="fa-solid fa-square-plus" />
                    </button>
                  </div>
                ))}
            </ScrollbarCustom>
          </div>
          <ModalBottom>
            <Button
              text="Guardar"
              disabled={
                body.hasOwnProperty("permisos") && body["permisos"].length <= 0
              }
              action={linkPerms}
            />
          </ModalBottom>
        </div>
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
      <div className="h-90 bg-dark-mode-base rounded p-2">
        {!isPending && (
          <div>
            <Success
              data={data.response}
              error={error}
              onContextAction={display}
            />
          </div>
        )}
      </div>
    </>
  );
}
const Success = ({ data, error, onContextAction }) => {
  const columnas = [
    { name: "Rol", selector: (row) => row.rol },
    {
      name: "Permisos",
      selector: (row) =>
        row["permisos_permitidos"].map((el) => el.permiso.permiso).join(", "),
    },
  ];
  return (
    <Tabla
      columnas={columnas}
      data={data}
      error={error}
      onContextAction={onContextAction}
    />
  );
};

export default ListaRoles;

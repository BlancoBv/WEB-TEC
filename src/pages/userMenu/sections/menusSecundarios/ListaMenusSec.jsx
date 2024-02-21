import React, { useState, useContext } from "react";
import useGetData from "../../../../hooks/useGetData";
import { TablaDropdown } from "../../../../components/Tabla";
import format from "../../../../assets/format";
import Loader from "../../../../components/Loader";
import Modal, { ModalBottom, ModalConfirm } from "../../../../components/Modal";
import ContextualMenu, { show } from "../../../../components/ContextualMenu";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import Axios from "../../../../axios/Axios";
import { AlertsContexts } from "../../IndexMenu";

function ListaMenusSec() {
  const { showSuccess, showError } = useContext(AlertsContexts);
  const [actualizador, setActualizador] = useState(false);
  const [showEditMenu, setShowEditMenu] = useState({
    status: false,
    type: "editMenu",
  });
  const [relativeData, setRelativeData] = useState({});
  const [body, setBody] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const { data, isPending, error } = useGetData(
    "/menu-blanco/obtener",
    actualizador
  );
  const display = (event, element) => {
    setRelativeData(element);
    show({ event });
  };
  const handle = (e) => {
    const { name, value } = e.target;
    setBody((prev) => ({ ...prev, [name]: value }));
  };

  const updateMenu = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(`/menu-blanco/editar/${relativeData.idmenu}`, body);
      showSuccess();
      setActualizador(!actualizador);
      setBody({});
    } catch (error) {
      showError();
    }
  };
  const addSubmenu = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("/menu-blanco/submenu/crear", body);
      showSuccess();
      setActualizador(!actualizador);
      setBody({});
    } catch (error) {
      showError();
    }
  };
  const deleteMenu = async () => {
    try {
      await Axios.delete(`/menu-blanco/eliminar/${relativeData.idmenu}`);
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
        const { nombre, url } = relativeData;
        setBody({ nombre, url });
        setShowEditMenu({ status: true, type: "editMenu" });
      },
    },
    {
      content: "Añadir subcategoria",
      icon: "fa-plus",
      action: () => {
        const { idmenu } = relativeData;
        setBody({ idMenu: idmenu });
        setShowEditMenu({ status: true, type: "addSub" });
      },
    },
    { content: "separator" },
    {
      content: "Eliminar",
      style: "text-danger",
      icon: "fa-trash-can",
      action: () =>
        setShowConfirm({
          status: true,
          route: "/categorias/eliminar/",
          target: "idcategoria",
        }),
      disabled:
        relativeData.hasOwnProperty("white_submenus") &&
        relativeData.white_submenus.length > 0,
    },
  ];

  return (
    <div className="h-100 w-100 bg-dark-mode-base rounded p-2">
      <ModalConfirm
        show={showConfirm}
        close={() => setShowConfirm(false)}
        action={deleteMenu}
      />
      <Modal
        title="Editar menu"
        show={showEditMenu.status}
        close={() => setShowEditMenu({ status: false, type: "editMenu" })}
        darkMode
        size="sm"
      >
        <form
          className="d-flex flex-column h-100 w-100"
          onSubmit={showEditMenu.type === "editMenu" ? updateMenu : addSubmenu}
        >
          <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
            <Input
              label="Titulo"
              placeholder="Titulo"
              handle={handle}
              name="nombre"
              value={body}
              required
            />
            <Input
              label="Ruta"
              placeholder="Ruta"
              handle={handle}
              name="url"
              value={body}
              required
            />
          </div>
          <ModalBottom>
            <Button text="Actualizar" type="Submit" />
          </ModalBottom>
        </form>
      </Modal>
      <ContextualMenu elements={contextMenuOptions} />
      {!isPending && <Success data={data.response} onContextAction={display} />}
      {isPending && (
        <div className="h-100 w-100 d-flex justify-content-center align-items-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
const Success = ({ data, onContextAction }) => {
  const columnas = {
    columnas: [
      {
        name: "Ultima vez actualizado",
        selector: (row) => format.formatFecha(row.updatedAt, "numeric"),
      },
      { name: "Titulo", selector: (row) => row.nombre },
      { name: "Ruta", selector: (row) => row.url },
    ],
    dropdown: {
      condition: (row) => row.white_submenus.length > 0,
      target: "white_submenus",
      columnas: [
        {
          name: "Ultima vez actualizado",
          selector: (row) => format.formatFecha(row.updatedAt, "numeric"),
        },
        { name: "Titulo", selector: (row) => row.nombre },
        { name: "Ruta", selector: (row) => row.url },
      ],
    },
  };
  return (
    <TablaDropdown
      data={data}
      columnas={columnas.columnas}
      dropdownOptions={columnas.dropdown}
      onContextAction={onContextAction}
    />
  );
};

export default ListaMenusSec;

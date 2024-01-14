import React, { useContext, useState } from "react";
import useGetData from "../../../../hooks/useGetData";
import Loader from "../../../../components/Loader";
import Modal, { ModalBottom, ModalConfirm } from "../../../../components/Modal";
import Axios, { urlMain } from "../../../../axios/Axios";
import ContextualMenu, {
  show as showMain,
} from "../../../../components/ContextualMenu";
import { AccordionTableMenus } from "../../../../components/Accordion";
import ScrollbarCustom from "../../../../components/ScrollbarCustom";
import { AlertsContexts } from "../../IndexMenu";
import { useContextMenu } from "react-contexify";
import Input, {
  InputSwitchAction,
  InputTextArea,
} from "../../../../components/Input";
import format from "../../../../assets/format";
import { useNavigate } from "react-router-dom";

function ListaMenus() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useContext(AlertsContexts);
  const [body, setBody] = useState({});
  const [autoRoute, setAutoRoute] = useState(true);
  const [actualizador, setActualizador] = useState(false);
  const [relativeData, setRelativeData] = useState({});
  const [showModal, setShowModal] = useState({
    status: false,
    data: "",
    title: "",
    target: "",
    route: "",
    type: "add",
  });
  const [showConfirm, setShowConfirm] = useState({
    status: false,
    route: "",
    target: "",
  });

  const { data, isPending, error } = useGetData(
    "/categorias/obtener",
    actualizador
  );
  const display = (event, element) => {
    setRelativeData(element);
    showMain({ event });
  };

  const contextMenuOptions = [
    {
      content: "Editar",
      icon: "fa-pen-to-square",
      action: () => {
        const { ruta, categoria, descripcion } = relativeData;
        setBody({ ruta, categoria, descripcion });
        setShowModal({
          status: true,
          title: `Editar ${relativeData.categoria}`,
          type: "edit",
          target: "idcategoria",
          route: "/categorias/editar/",
          type: "update",
        });
      },
    },
    {
      content: "Añadir subcategoria",
      icon: "fa-plus",
      action: () => {
        setShowModal({
          status: true,
          title: `Añadir en ${relativeData.categoria}`,
          type: "add",
        });
      },
      disabled:
        relativeData.hasOwnProperty("dropcollapse") &&
        !relativeData.dropcollapse,
    },
    { content: "separator" },
    {
      content: "Editar articulo",
      icon: "fa-file-code",
      action: () => {
        navigate(`/panel/article/${relativeData["ruta"]}`);
      },
      disabled:
        relativeData.hasOwnProperty("dropcollapse") &&
        relativeData.dropcollapse,
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
    },
  ];
  //opciones del menu de las subcategorias
  const ID = "context-menu-secondary";
  const { show } = useContextMenu({ id: ID }); //inicializa un nuevo disparador para el menu-contextual secundario
  const displaySecondary = (event, element) => {
    setRelativeData(element);
    show({ event });
  };
  const contextMenuOptionsSecondary = [
    {
      content: "Editar",
      icon: "fa-pen-to-square",
      action: () => {
        const { ruta, subcategoria, descripcion } = relativeData;
        setBody({ ruta, subcategoria, descripcion });
        setShowModal({
          status: true,
          title: "Editar etiqueta",
          target: "idsubcategoria",
          route: "/subcategorias/editar/",
          type: "update",
        });
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
          route: "/subcategorias/eliminar/",
          target: "idsubcategoria",
        }),
    },
  ];
  const handle = (e) => {
    const { name, value } = e.target;
    setBody({ ...body, [name]: value });
    if (
      document.activeElement === document.getElementById("subcategoria") &&
      autoRoute
    ) {
      const newValue = format.formatRoute(value);
      setBody((prev) => ({ ...prev, ruta: newValue }));
    }
  };
  const handleRuta = (e) => {
    const { name, value } = e.target;
    const newValue = format.formatRoute(value);
    setBody({ ...body, [name]: newValue });
  };
  //fin opciones del menu de subcategorias

  const deleteElement = async () => {
    try {
      await Axios.delete(
        `${showConfirm.route}${relativeData[showConfirm.target]}`
      );
      showSuccess();
      setActualizador(!actualizador);
    } catch (error) {}
  };
  const addSubElement = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("/subcategorias/crear", {
        idcategoria: relativeData.idcategoria,
        ...body,
      });
      showSuccess();
      setActualizador(!actualizador);
      setBody({});
    } catch (error) {}
  };
  const updateElement = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(
        `${showModal.route}${relativeData[showModal.target]}`,
        body
      );
      showSuccess();
      setActualizador(!actualizador);
      setBody({});
    } catch (error) {
      showError();
    }
  };
  console.log(urlMain);

  return (
    <div className="h-100 w-100 d-flex flex-column gap-2">
      <ContextualMenu elements={contextMenuOptions} />
      <ContextualMenu elements={contextMenuOptionsSecondary} id={ID} />
      <ModalConfirm
        show={showConfirm.status}
        darkMode={true}
        close={() => setShowConfirm({ status: false, route: "" })}
        action={deleteElement}
      />
      <Modal
        show={showModal.status}
        close={() => {
          setShowModal({ status: false, data: "" });
          setBody({});
        }}
        title={showModal.title}
        darkMode={true}
        size="sm"
      >
        <form
          className="h-100 w-100 d-flex flex-column"
          onSubmit={showModal.type === "add" ? addSubElement : updateElement}
        >
          <Input
            label={`Titulo ${
              showModal.type === "add" ? "del submenú" : "de la categoria"
            }`}
            placeholder="Titulo"
            handle={handle}
            name={showModal.type === "add" ? "subcategoria" : "categoria"}
            value={body}
            id="subcategoria"
            required={true}
          />
          <div className="flex-grow-1">
            <InputTextArea
              label="Descripción"
              placeholder="Descripción"
              handle={handle}
              name="descripcion"
              value={body}
              required={true}
            />
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="flex-grow-1">
              <Input
                label="Ruta"
                placeholder="Ruta"
                handle={handleRuta}
                name="ruta"
                value={body}
                disabled={autoRoute}
              />
            </div>
            <InputSwitchAction
              label="Ruta automatica"
              initialChecked={autoRoute}
              checkedAction={() => {
                setAutoRoute(true);
                return true;
              }}
              uncheckedAction={() => {
                setAutoRoute(false);
                return true;
              }}
            />
          </div>
          <ModalBottom>
            <button className="mx-auto" type="submit">
              Guardar
            </button>
          </ModalBottom>
        </form>
      </Modal>

      <div className="flex-grow-1 bg-dark-mode-base rounded p-2 d-flex">
        {!isPending && (
          <Success
            data={data.response}
            modalState={{ showModal, setShowModal }}
            showContextMenu={display}
            showContextMenuSecondary={displaySecondary}
          />
        )}
        {isPending && <Loader />}
      </div>
    </div>
  );
}

const Success = ({ data, showContextMenu, showContextMenuSecondary }) => {
  return (
    <>
      <div className="w-100">
        <ScrollbarCustom>
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
                      subcategoriaTargets={[
                        "updatedAt",
                        "subcategoria",
                        "ruta",
                      ]}
                      showContextMenu={showContextMenu}
                      showContextMenuSecondary={showContextMenuSecondary}
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
        </ScrollbarCustom>
      </div>
    </>
  );
};

export default ListaMenus;

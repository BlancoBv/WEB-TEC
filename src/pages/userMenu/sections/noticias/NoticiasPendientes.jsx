import useGetData from "../../../../hooks/useGetData";
import format from "../../../../assets/format";
import Modal, { ModalBottom, ModalConfirm } from "../../../../components/Modal";
import { InputSelect, InputSwitchAction } from "../../../../components/Input";
import Axios from "../../../../axios/Axios";
import { useState, useContext } from "react";
import { AlertsContexts } from "../../IndexMenu";
import Loader from "../../../../components/Loader";
import NoticiaContent from "../../../../components/NoticiaContent";
import Tabla from "../../../../components/Tabla";
import ContextualMenu, { show } from "../../../../components/ContextualMenu";
import ScrollbarCustom from "../../../../components/ScrollbarCustom";

function NoticiasPendientes() {
  const { showSuccess, showError } = useContext(AlertsContexts);
  const [labels, setLabels] = useState([]);
  const [showLabels, setShowLabels] = useState(false);
  const [actualizador, setActualizador] = useState(false);
  const [relativeData, setRelativeData] = useState({});
  const [showConfirmacion, setShowConfirmacion] = useState({
    status: false,
    type: "",
    value: "",
  });
  const [showPreview, setShowPreview] = useState(false);
  const [body, setBody] = useState({});

  const { data, isPending } = useGetData(
    "/blogs/obtener?estatus=pendiente&mostrarSinVigencia=true",
    actualizador
  );
  const etiquetas = useGetData("/etiquetas/obtener");

  const updateStatus = async (value) => {
    try {
      await Axios.put(`/blogs/cambiarestatusxidblog/${relativeData.idblog}`, {
        estatus: value,
      });
      showSuccess();
      setActualizador(!actualizador);
    } catch (error) {
      console.log(error);
    }
  };

  const updateLabels = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(
        `/blogs/actualizaretiquetasxidblog/${relativeData.idblog}`,
        {
          idsEtiquetas: labels,
        }
      );
      showSuccess();
      setActualizador(!actualizador);
    } catch (error) {
      showError();
    }
  };
  const display = (event, element) => {
    show({ event });
    setRelativeData(element);
  };
  const previewBlog = (element) => {
    setRelativeData(element);
    setShowPreview(true);
  };
  const contextOptions = [
    {
      content: "Publicar",
      icon: "fa-check",
      style: "text-success",
      action: () => {
        setShowConfirmacion({ status: true, type: "post", value: "aceptado" });
      },
      disabled:
        relativeData.hasOwnProperty("etiquetas") &&
        relativeData.etiquetas.length <= 0,
    },
    { content: "separator" },
    {
      content: "Rechazar",
      icon: "fa-xmark",
      style: "text-danger",
      action: () => {
        setShowConfirmacion({
          status: true,
          type: "delete",
          value: "rechazado",
        });
      },
    },
    { content: "separator" },
    {
      content: "Editar etiquetas",
      icon: "fa-pen-to-square",
      action: () => {
        console.log(relativeData);
        const etiqueta = relativeData.etiquetas.map((el) => el.idetiqueta);
        setShowLabels(true);
        setLabels(etiqueta);
      },
    },
  ];

  return (
    <div className="h-100 w-100 bg-dark-mode-base rounded p-2">
      <ModalConfirm
        darkMode={true}
        show={showConfirmacion.status}
        close={() =>
          setShowConfirmacion({ status: false, type: "", value: "" })
        }
        action={() => updateStatus(showConfirmacion.value)}
      >
        {showConfirmacion.type === "post" ? (
          <span>Asegurese de verificar que todos los datos son correctos.</span>
        ) : (
          <span>Se rechazará la entrada seleccionada.</span>
        )}
      </ModalConfirm>
      <ContextualMenu elements={contextOptions} />
      <Modal
        title={relativeData.titulo}
        show={showPreview}
        close={() => setShowPreview(false)}
        darkMode={true}
        size="md"
      >
        <NoticiaContent data={relativeData} />
      </Modal>
      <Modal
        show={showLabels}
        title="Editar etiquetas"
        close={() => setShowLabels(false)}
        darkMode={true}
        size="md"
      >
        <form className="h-100" onSubmit={updateLabels}>
          <ScrollbarCustom height="90%">
            <div className="h-100 w-100 d-flex justify-content-evenly flex-wrap">
              {!etiquetas.isPending &&
                etiquetas.data.response.map((el) => (
                  <InputSwitchAction
                    label={el.etiqueta}
                    initialChecked={() => {
                      const etiquetas = relativeData.etiquetas;
                      return etiquetas.some(
                        (label) => label.idetiqueta === el.idetiqueta
                      );
                    }}
                    checkedAction={() => {
                      setLabels([...labels, el.idetiqueta]);
                      return true;
                    }}
                    uncheckedAction={() => {
                      const filtered = labels.filter(
                        (elem) => elem !== el.idetiqueta
                      );

                      setLabels(filtered);
                      return true;
                    }}
                  />
                ))}
            </div>
          </ScrollbarCustom>
          <ModalBottom>
            <button type="submit">Guardar</button>
          </ModalBottom>
        </form>
      </Modal>
      {!isPending && (
        <Success
          datos={data.response}
          display={display}
          showPreview={previewBlog}
        />
      )}
      {isPending && <Loader />}
    </div>
  );
}

const Success = ({ datos, showPreview, display }) => {
  const columnas = [
    {
      name: "Ultima Actualización",
      selector: (row) => format.formatFecha(row.updatedAt, "numeric"),
    },
    { name: "Titulo", selector: (row) => row.titulo },
    {
      name: "Etiquetas",
      selector: (row) => row.etiquetas.map((el) => el.etiqueta).join(", "),
    },
  ];
  return (
    <Tabla
      data={datos}
      columnas={columnas}
      onContextAction={display}
      onClickAction={showPreview}
    />
  );
};
export default NoticiasPendientes;

import useGetData from "../../../../hooks/useGetData";
import format from "../../../../assets/format";
import Modal, { ModalBottom, ModalConfirm } from "../../../../components/Modal";
import { InputImage, InputSwitchAction } from "../../../../components/Input";
import Axios, { multipartHeader, urlMain } from "../../../../axios/Axios";
import { useState, useContext } from "react";
import { AlertsContexts } from "../../IndexMenu";
import Loader from "../../../../components/Loader";
import NoticiaContent from "../../../../components/NoticiaContent";
import Tabla from "../../../../components/Tabla";
import ContextualMenu, { show } from "../../../../components/ContextualMenu";
import ScrollbarCustom from "../../../../components/ScrollbarCustom";
import Perm from "../../../../auth/Perm";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";

function NoticiasPendientes() {
  const { showSuccess, showError } = useContext(AlertsContexts);
  const navigate = useNavigate();
  const [labels, setLabels] = useState([]);
  const [showLabels, setShowLabels] = useState(false);
  const [actualizador, setActualizador] = useState(false);
  const [relativeData, setRelativeData] = useState({});
  const [showConfirmacion, setShowConfirmacion] = useState({
    status: false,
    type: "",
    value: "",
  });
  const [showEditImage, setShowEditImage] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [body, setBody] = useState({});

  const { data, isPending, error } = useGetData(
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
  const updateImagenPrincipal = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imagen", body.imagen.file);
    try {
      await Axios.put(
        `/blogs/actualizarimagenprincipalxidblog/${relativeData.idblog}`,
        formData,
        multipartHeader
      );
      showSuccess();
      setActualizador(!actualizador);
      setShowEditImage(false);
      setBody({});
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
      show: Perm(9),
    },
    { content: "separator", show: Perm(9) },
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
      show: Perm(9),
    },
    { content: "separator", show: Perm(19) || Perm(10) },
    {
      content: "Añadir/editar etiquetas",
      icon: "fa-tag",
      action: () => {
        const etiqueta = relativeData.etiquetas.map((el) => el.idetiqueta);
        setShowLabels(true);
        setLabels(etiqueta);
      },
      show: Perm(19),
    },
    {
      content: "Editar noticia",
      icon: "fa-newspaper",
      action: () => navigate(`editar/${relativeData.idblog}`),
      show: Perm(10),
    },
    {
      content: "Editar imagen principal",
      icon: "fa-image",
      action: () => setShowEditImage(true),
      show: Perm(10),
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
      <Modal
        title="Editar imagen"
        show={showEditImage}
        close={() => setShowEditImage(false)}
        darkMode
      >
        <form className="h-100 w-100" onSubmit={updateImagenPrincipal}>
          <div className="d-flex justify-content-evenly align-items-center h-10">
            <InputImage
              label="Selecciona la nueva imagen"
              variable={body}
              setVariable={setBody}
              name="imagen"
            />
            <Button text="Guardar" type="submit" />
          </div>
          <div className="h-90 w-100 d-flex gap-2">
            <div className="d-flex flex-column w-50 h-100">
              <ScrollbarCustom>
                <h4>Imagen actual</h4>
                <img
                  src={`${urlMain}${relativeData.imagen}`}
                  alt="previsualización"
                  width="100%"
                />
              </ScrollbarCustom>
            </div>
            <div className="d-flex flex-column w-50 h-100">
              <ScrollbarCustom>
                <h4>Imagen nueva</h4>
                <img
                  src={body.hasOwnProperty("imagen") && body.imagen.src}
                  alt="previsualización"
                  width="100%"
                />
              </ScrollbarCustom>
            </div>
          </div>
        </form>
      </Modal>
      {!isPending && (
        <Success
          datos={data.response}
          display={display}
          showPreview={previewBlog}
          error={error}
        />
      )}
      {isPending && <Loader />}
    </div>
  );
}

const Success = ({ datos, showPreview, display, error }) => {
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
      error={error}
    />
  );
};
export default NoticiasPendientes;

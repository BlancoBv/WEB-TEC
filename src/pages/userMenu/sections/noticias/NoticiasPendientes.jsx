import useGetData from "../../../../hooks/useGetData";
import format from "../../../../assets/format";
import Modal from "../../../../components/Modal";
import { InputSelect, InputSwitchAction } from "../../../../components/Input";
import Axios from "../../../../axios/Axios";
import { useState, useContext } from "react";
import { AlertsContexts } from "../../IndexMenu";
import Loader from "../../../../components/Loader";
import NoticiaContent from "../../../../components/NoticiaContent";

function NoticiasPendientes() {
  const { showSuccess, closeAlerts } = useContext(AlertsContexts);
  const [showSettings, setShowSettings] = useState(false);
  const [actualizador, setActualizador] = useState(false);
  const [blogData, setBlogData] = useState({});
  const [body, setBody] = useState({});
  const [labels, setLabels] = useState([]);
  const { data, isPending, error } = useGetData(
    "/blogs/obtener?estatus=pendiente",
    actualizador
  );
  const etiquetas = useGetData("/etiquetas/obtener");
  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(`/blogs/cambiarestatusxidblog/${blogData.idblog}`, {
        estatus: body.estatus,
      });
      showSuccess();
      setTimeout(() => {
        closeAlerts();
        setShowSettings(false);
        setActualizador(!actualizador);
      }, 800);
    } catch (error) {
      console.log(error);
    }
  };
  const addEtiqueta = async (id) => {
    const newLabels = [...labels, id];
    setLabels(newLabels);
    return await updateLabels(newLabels);
  };
  const removeEtiqueta = async (id) => {
    const newLabels = labels.filter((el) => el !== id);
    setLabels(newLabels);
    return await updateLabels(newLabels);
  };
  const handle = (e) => {
    const { value, name } = e.target;
    setBody({ ...body, [name]: value });
  };
  const updateLabels = async (data) => {
    try {
      await Axios.put(`/blogs/actualizaretiquetasxidblog/${blogData.idblog}`, {
        idsEtiquetas: data,
      });
      showSuccess();
      setTimeout(() => {
        closeAlerts();
        setActualizador(!actualizador);
      }, 800);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  console.log(blogData);
  return (
    <div className="h-100 w-100 bg-dark-mode-base p-2 rounded d-flex flex-column">
      <Modal
        show={showSettings}
        title="Configurar noticia"
        close={() => setShowSettings(false)}
        darkMode={true}
        size="md"
      >
        <form
          className="d-flex align-items-center justify-content-center gap-2"
          onSubmit={saveChanges}
        >
          <InputSelect
            label="Estatus de la noticia"
            name="estatus"
            value={body}
            handle={handle}
          >
            <option value="pendiente">Pendiente</option>
            <option value="aceptado">Aceptado</option>
            {/* <option value="rechazado">Rechazado</option> */}
          </InputSelect>
          <div>
            <button
              type="submit"
              disabled={
                blogData.hasOwnProperty("Etiquetas") &&
                blogData.etiquetas.length <= 0
              }
            >
              Cambiar estatus
            </button>
          </div>
        </form>
        <div className="d-flex align-items-center justify-content-center gap-2">
          {!etiquetas.isPending &&
            !etiquetas.error &&
            etiquetas.data.response.map((el) => (
              <InputSwitchAction
                label={el.etiqueta}
                key={el.idetiqueta}
                initialChecked={
                  blogData.hasOwnProperty("Etiquetas") &&
                  blogData.Etiquetas.some(
                    (etiqueta) => etiqueta.idetiqueta === el.idetiqueta
                  )
                }
                checkedAction={() => addEtiqueta(el.idetiqueta)}
                uncheckedAction={() => removeEtiqueta(el.idetiqueta)}
              />
            ))}
        </div>
      </Modal>
      {!isPending && !error && (
        <Success
          datos={data.response}
          alerts={{ showSuccess, closeAlerts }}
          stateActualizador={[actualizador, setActualizador]}
          setShowSettings={setShowSettings}
          setBlogData={setBlogData}
          setBody={setBody}
          setLabels={setLabels}
        />
      )}
      {isPending && <Loader />}
    </div>
  );
}

const Success = ({
  datos,
  setBlogData,
  setBody,
  setLabels,
  setShowSettings,
}) => {
  const [showPreview, setShowPreview] = useState({ status: false, data: "" });

  const showAjustes = (element, event) => {
    event.stopPropagation();
    const { etiquetas } = element;

    const onlyIdLabels =
      etiquetas.length > 0 ? etiquetas.map((el) => el.idetiqueta) : [];

    setBlogData(element);
    setShowSettings(true);
    setBody({ estatus: element.estatus });
    setLabels(onlyIdLabels);
  };

  const preview = (event, element) => {
    setShowPreview({ status: true, data: element });
  };

  return (
    <>
      <Modal
        title={showPreview.data.titulo}
        show={showPreview.status}
        close={() => setShowPreview({ status: false, data: "" })}
        darkMode={true}
        size="md"
      >
        <NoticiaContent data={showPreview.data} />
      </Modal>
      <table className="w-100 table table-hover">
        <thead>
          <tr>
            <th>Subido por</th>
            <th>Ultima actualización</th>
            <th>Estatus</th>
            <th>Título</th>
            <th>Etiquetas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((el) => (
            <tr
              key={el.idblog}
              onClick={(e) => preview(e, el)}
              role="button"
              title={`Previsualizar ${el.titulo}`}
            >
              <td>{el.usuario}</td>
              <td>{format.formatFechaDB(el.updatedAt)}</td>
              <td>{format.formatTextoMayusPrimeraLetra(el.estatus)}</td>

              <td>
                <b>{el.titulo}</b>
              </td>
              <td>{el.etiquetas}</td>

              <td>
                <span className="w-100 h-100 d-flex justify-content-evenly">
                  <button title="Editar" onClick={(e) => e.stopPropagation()}>
                    <i className="fa-solid fa-pen-to-square" />
                  </button>
                  <button
                    title="Más configuraciones"
                    onClick={(e) => showAjustes(el, e)}
                  >
                    <i className="fa-solid fa-gear" />
                  </button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default NoticiasPendientes;

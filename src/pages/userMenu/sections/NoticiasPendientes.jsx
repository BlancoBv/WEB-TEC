import useGetData from "../../../hooks/useGetData";
import format from "../../../assets/format";
import Modal from "../../../components/Modal";
import { InputSelect, InputSwitchAction } from "../../../components/Input";
import Axios from "../../../axios/Axios";
import { useState, useContext } from "react";
import { AlertsContexts } from "../IndexMenu";

function NoticiasPendientes() {
  const { showSuccess, closeAlerts } = useContext(AlertsContexts);
  const { data, isPending, error } = useGetData(
    "/blogs/obtener?estatus=pendiente"
  );

  return (
    <div className="h-100 w-100">
      NoticiasPendientes
      {!isPending && !error && (
        <Success datos={data.response} alerts={{ showSuccess, closeAlerts }} />
      )}
    </div>
  );
}

const Success = ({ datos, alerts }) => {
  const { showSuccess, closeAlerts } = alerts;
  const [blogData, setBlogData] = useState({});
  const [showSettings, setShowSettings] = useState(false);
  const [body, setBody] = useState({});
  const [labels, setLabels] = useState([]);

  const { data, isPending, error } = useGetData("/etiquetas/obtener");

  const saveChanges = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(`/blogs/cambiarestatusxidblog/${blogData.idblog}`, {
        estatus: body.estatus,
      });
      showSuccess();
      setTimeout(() => {
        closeAlerts();
      }, 800);
    } catch (error) {}
  };

  const showAjustes = (element) => {
    const { Etiquetas } = element;

    const onlyIdLabels =
      Etiquetas.length > 0 ? Etiquetas.map((el) => el.idetiqueta) : [];

    setBlogData(element);
    setShowSettings(true);
    setBody({ estatus: element.estatus });
    setLabels(onlyIdLabels);
  };
  const handle = (e) => {
    const { value, name } = e.target;
    setBody({ ...body, [name]: value });
  };
  const updateLabels = async (data) => {
    console.log(data);
    try {
      await Axios.put(`/blogs/actualizaretiquetasxidblog/${blogData.idblog}`, {
        idsEtiquetas: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addEtiqueta = async (id) => {
    const newLabels = [...labels, id];
    setLabels(newLabels);
    await updateLabels(newLabels);
  };
  const removeEtiqueta = async (id) => {
    const newLabels = labels.filter((el) => el !== id);
    setLabels(newLabels);
    await updateLabels(newLabels);
  };

  return (
    <>
      <Modal
        show={showSettings}
        title="Configurar noticia"
        close={() => setShowSettings(false)}
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
                blogData.Etiquetas.length <= 0
              }
            >
              Cambiar estatus
            </button>
          </div>
        </form>
        <div className="d-flex align-items-center justify-content-center gap-2">
          {!isPending &&
            !error &&
            data.response.map((el) => (
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
          ))}
        </tbody>
      </table>
    </>
  );
};
export default NoticiasPendientes;

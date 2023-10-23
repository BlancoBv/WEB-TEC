import useGetData from "../../../hooks/useGetData";
import format from "../../../assets/format";
import Modal from "../../../components/Modal";
import { InputSelect } from "../../../components/Input";
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
        <Success data={data.response} alerts={{ showSuccess, closeAlerts }} />
      )}
    </div>
  );
}

const Success = ({ data, alerts }) => {
  const { showSuccess, closeAlerts } = alerts;
  const [blogData, setBlogData] = useState({});
  const [showSettings, setShowSettings] = useState(false);
  const [body, setBody] = useState({});

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
    setBlogData(element);
    setShowSettings(true);
    setBody({ estatus: element.estatus });
  };
  const handle = (e) => {
    const { value, name } = e.target;
    setBody({ ...body, [name]: value });
  };
  console.log(body);

  return (
    <>
      <Modal
        show={showSettings}
        title="Configurar noticia"
        close={() => setShowSettings(false)}
      >
        <form className="d-flex flex-column" onSubmit={saveChanges}>
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
            <button type="submit">Guardar ajustes</button>
          </div>
        </form>
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
          {data.map((el) => (
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

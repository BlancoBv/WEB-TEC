import { useContext, useState } from "react";
import Axios, { urlMain } from "../../../axios/Axios";
import UseGetData from "../../../hooks/useGetData";
import Modal from "../../../components/Modal";

import { InputImage, InputSwitchAction } from "../../../components/Input";
import { AlertsContexts } from "../IndexMenu";
import Loader from "../../../components/Loader";

function Banners() {
  const { showSuccess, closeAlerts } = useContext(AlertsContexts);
  const [actualizar, setActualizar] = useState(false);
  const { data, isPending } = UseGetData("/banners/obtener", actualizar);
  const [showAddBanner, setShowAddBanner] = useState(false);

  const [banner, setBanner] = useState({ imagen: "" });

  const saveBanner = async (e) => {
    e.preventDefault();

    try {
      const fdata = new FormData();
      fdata.append("imagen", banner.imagen.file);
      await Axios.post("/banners/crear", fdata, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      showSuccess();
      setTimeout(() => {
        closeAlerts();
        setBanner({ imagen: "" });
        setShowAddBanner(false);
      }, 1000);
      setActualizar(!actualizar);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-100 w-100">
      <Modal
        show={showAddBanner}
        close={() => setShowAddBanner(false)}
        title="Añadir nuevo banner"
      >
        <form onSubmit={saveBanner}>
          <div className="d-flex justify-content-evenly align-items-center">
            <InputImage
              label="Selecciona la nueva imagen"
              variable={banner}
              setVariable={setBanner}
              name="imagen"
            />
            <button type="submit">Guardar</button>
          </div>
          {banner.imagen && (
            <img
              src={banner.imagen && banner.imagen.src}
              alt="previsualización"
              width="100%"
            />
          )}
        </form>
      </Modal>
      <div className="h-10 border-bottom">
        <button onClick={() => setShowAddBanner(true)}>Nuevo banner</button>
      </div>
      <div className="h-90 overflow-y-auto">
        {!isPending && (
          <Success
            data={data.response}
            actualizarState={[actualizar, setActualizar]}
            bannerState={[banner, setBanner]}
          />
        )}
        {isPending && <Loader />}
      </div>
    </div>
  );
}

const Success = ({ data, actualizarState, bannerState }) => {
  const { showSuccess, closeAlerts } = useContext(AlertsContexts);
  const [actualizar, setActualizar] = actualizarState;
  const [showImage, setShowImage] = useState({
    status: false,
    url: "",
    idBanner: "",
  });
  const [showChangeImage, setShowChangeImage] = useState({
    status: false,
    idbanner: "",
  });

  const [banner, setBanner] = useState({ imagen: "" });

  const visualizarImagen = (el) => {
    console.log(el);
    setShowImage({
      status: true,
      url: `${urlMain}${el.imagen}`,
      idBanner: el.idbanner,
    });
  };

  const actualizarVisibilidad = async (id, value) => {
    try {
      await Axios.put(`/banners/actualizarvigenciaxidbanner/${id}`, value);
      showSuccess();
      setTimeout(() => {
        closeAlerts();
      }, 1000);
      setActualizar(!actualizar);
    } catch (error) {
      console.log(error);
    }
  };

  const updateImage = async (e) => {
    e.preventDefault();
    try {
      const fdata = new FormData();
      fdata.append("imagen", banner.imagen.file);
      await Axios.put(
        `/banners/actualizarxidbanner/${showChangeImage.idbanner}`,
        fdata,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      setActualizar(!actualizar);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        title={`Previsualización imagen ${showImage.idBanner}`}
        show={showImage.status}
        close={() => setShowImage({ status: false, idBanner: "", url: "" })}
      >
        <img
          src={showImage.url}
          alt={`Previsualizacion imagen_${showImage.idBanner}`}
          width="100%"
        />
      </Modal>
      <Modal
        show={showChangeImage.status}
        title={`Cambiar imagen ${showChangeImage.idbanner}`}
        close={() => setShowChangeImage({ status: false, idbanner: "" })}
      >
        <form onSubmit={updateImage}>
          <div className="d-flex justify-content-evenly align-items-center">
            <InputImage
              label="Selecciona la nueva imagen"
              variable={banner}
              setVariable={setBanner}
              name="imagen"
            />
            <button type="submit">Actualizar</button>
          </div>
          {banner.imagen && (
            <img
              src={banner.imagen && banner.imagen.src}
              alt="previsualización"
              width="100%"
            />
          )}
        </form>
      </Modal>

      <div className="w-100">
        <table className="w-100 table table-hover">
          <thead>
            <tr>
              <th>Subido por</th>
              <th>Ultima actualización</th>
              <th>Visibilidad</th>
              <th>Vista previa</th>
              <th>Visibilidad</th>
              <th>Cambiar imagen</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el, i) => (
              <tr key={i}>
                <td>{el.usuario}</td>
                <td>{el.updatedAt}</td>
                <td>{el.mostrar ? "Visible" : "Oculta"}</td>
                <td>
                  <img
                    src={`${urlMain}${el.imagen}`}
                    alt={`imagen_${el.idbanner}`}
                    width="100px"
                    onClick={() => visualizarImagen(el)}
                    role="button"
                  />
                </td>
                <td>
                  <InputSwitchAction
                    initialChecked={el.mostrar}
                    checkedAction={() =>
                      actualizarVisibilidad(el.idbanner, { vigente: true })
                    }
                    uncheckedAction={() =>
                      actualizarVisibilidad(el.idbanner, { vigente: false })
                    }
                  />
                </td>
                <td>
                  <i
                    className="fa-regular fa-folder-open fs-4"
                    role="button"
                    onClick={() =>
                      setShowChangeImage({
                        status: true,
                        idbanner: el.idbanner,
                      })
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Banners;

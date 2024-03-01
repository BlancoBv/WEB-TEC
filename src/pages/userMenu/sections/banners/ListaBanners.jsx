import { useContext, useState } from "react";
import Axios, { multipartHeader, urlMain } from "../../../../axios/Axios";
import UseGetData from "../../../../hooks/useGetData";
import Modal, { ModalBottom, ModalConfirm } from "../../../../components/Modal";
import Input, { InputImage } from "../../../../components/Input";
import { AlertsContexts } from "../../IndexMenu";
import Loader from "../../../../components/Loader";
import ScrollbarCustom from "../../../../components/ScrollbarCustom";
import Tabla from "../../../../components/Tabla";
import format from "../../../../assets/format";
import ContextualMenu, { show } from "../../../../components/ContextualMenu";
import Button from "../../../../components/Button";
import Perm from "../../../../auth/Perm";

function Banners() {
  const { showSuccess, showError } = useContext(AlertsContexts);
  const [actualizar, setActualizar] = useState(false);
  const [showAddBanner, setShowAddBanner] = useState(false);
  const [banner, setBanner] = useState({ imagen: "" });
  const [relativeData, setRelativeData] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConfirmLink, setShowConfirmLink] = useState(false);
  const [body, setBody] = useState({});
  const [showEditLink, setShowEditLink] = useState(false);
  const [showImage, setShowImage] = useState({
    status: false,
    url: "",
    idBanner: "",
  });
  const [showEditImage, setShowEditImage] = useState(false);

  const { data, isPending, error } = UseGetData("/banners/obtener", actualizar);

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

      setBanner({ imagen: "" });
      setShowAddBanner(false);

      setActualizar(!actualizar);
    } catch (error) {
      showError();
    }
  };
  const deleteBanner = async () => {
    try {
      await Axios.delete(`/banners/eliminarxidbanner/${relativeData.idbanner}`);
      showSuccess();
      setActualizar(!actualizar);
    } catch (error) {}
  };
  const deleteBannerLink = async () => {
    try {
      await Axios.delete(`/banners/linkxidbanner/${relativeData.idbanner}`);
      showSuccess();
      setActualizar(!actualizar);
    } catch (error) {}
  };
  const updateBannerLink = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(`/banners/linkxidbanner/${relativeData.idbanner}`, body);
      showSuccess();
      setActualizar(!actualizar);
    } catch (error) {
      showError();
    }
  };
  const updateBannerImage = async (e) => {
    e.preventDefault();

    try {
      const fdata = new FormData();
      fdata.append("imagen", banner.imagen.file);
      await Axios.post(
        `/banners/actualizarxidbanner/${relativeData.idbanner}`,
        fdata,
        multipartHeader
      );

      showSuccess();

      setBanner({ imagen: "" });
      setShowAddBanner(false);

      setActualizar(!actualizar);
    } catch (error) {
      showError();
    }
  };
  const updateVisibility = async () => {
    try {
      await Axios.put(
        `/banners/actualizarvigenciaxidbanner/${relativeData.idbanner}`,
        { vigente: !relativeData.mostrar }
      );
      showSuccess();
      setActualizar(!actualizar);
    } catch (error) {}
  };
  const handleInput = (e) => {
    const { value, name } = e.target;
    setBody((prev) => ({ ...prev, [name]: value }));
  };

  const display = (event, element) => {
    setRelativeData(element);
    show({ event });
  };
  const visualizarImagen = (el) => {
    setShowImage({
      status: true,
      url: `${urlMain}${el.imagen}`,
      idBanner: el.idbanner,
    });
  };
  const contextMenuOptions = [
    {
      content: relativeData.mostrar ? "Dejar de mostrar" : "Hacer visible",
      icon: "fa-eye",
      action: updateVisibility,
    },
    { content: "separator" },
    {
      content: "Editar imagen",
      icon: "fa-pen-to-square",
      action: () => {
        setShowEditImage(true);
      },
    },
    {
      content: "Añadir/editar enlace",
      icon: "fa-pen-to-square",
      action: () => {
        setBody({ url: relativeData.url });
        setShowEditLink(true);
      },
    },
    { content: "separator" },
    {
      content: "Eliminar",
      style: "text-danger",
      icon: "fa-trash-can",
      action: () => setShowConfirm(true),
    },
    {
      content: "Eliminar enlace",
      style: "text-danger",
      icon: "fa-trash-can",
      action: () => setShowConfirmLink(true),
      disabled: !relativeData.url,
    },
  ];

  return (
    <div className="h-100 w-100">
      <ContextualMenu elements={contextMenuOptions} />
      <Modal
        title={`Previsualización imagen ${showImage.idBanner}`}
        show={showImage.status}
        close={() => setShowImage({ status: false, idBanner: "", url: "" })}
        darkMode
      >
        <ScrollbarCustom>
          <img
            src={showImage.url}
            alt={`Previsualizacion imagen_${showImage.idBanner}`}
            width="100%"
          />
        </ScrollbarCustom>
      </Modal>
      <Modal
        darkMode
        show={showAddBanner}
        close={() => {
          setShowAddBanner(false);
          setBanner({ imagen: "" });
        }}
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
            <Button text="Guardar" type="submit" />
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
      <Modal
        darkMode
        show={showEditImage}
        close={() => {
          setShowEditImage(false);
          setBanner({ imagen: "" });
        }}
        title="Editar imagen del banner"
      >
        <form onSubmit={updateBannerImage}>
          <div className="d-flex justify-content-evenly align-items-center">
            <InputImage
              label="Selecciona la nueva imagen"
              variable={banner}
              setVariable={setBanner}
              name="imagen"
            />
            <Button text="Actualizar" type="submit" />
          </div>
        </form>
      </Modal>
      <Modal
        title="Editar enlace"
        show={showEditLink}
        size="sm"
        close={() => setShowEditLink(false)}
        darkMode
      >
        <form
          className="d-flex flex-column h-100 w-100"
          onSubmit={updateBannerLink}
        >
          <div className="flex-grow-1 d-flex align-items-center justify-content-center">
            <Input
              label="Enlace"
              placeholder="https://enlace-de-ejemplo.com"
              name="url"
              value={body}
              handle={handleInput}
              required
            />
          </div>
          <ModalBottom>
            <Button text="Guardar" type="submit" />
          </ModalBottom>
        </form>
      </Modal>
      <ModalConfirm
        show={showConfirm}
        close={() => setShowConfirm(false)}
        action={deleteBanner}
      />
      <ModalConfirm
        show={showConfirmLink}
        close={() => setShowConfirmLink(false)}
        action={deleteBannerLink}
      />
      {Perm(5) && (
        <div className="h-10">
          <button onClick={() => setShowAddBanner(true)}>Nuevo banner</button>
        </div>
      )}
      <div
        className={`h-${Perm(5) ? "90" : "100"} rounded bg-dark-mode-base p-2`}
      >
        {!isPending && (
          <Success
            data={data.response}
            actualizarState={[actualizar, setActualizar]}
            bannerState={[banner, setBanner]}
            error={error}
            showContextMenu={display}
            showImage={visualizarImagen}
          />
        )}
        {isPending && <Loader />}
      </div>
    </div>
  );
}

const Success = ({ data, showContextMenu, error, showImage }) => {
  const columnas = [
    {
      name: "Ultima vez actualizado",
      selector: (row) => format.formatFecha(row.updatedAt, "numeric"),
    },
    { name: "Subido por", selector: (row) => row.usuario },
    {
      name: "Visibilidad",
      selector: (row) => (row.mostrar ? "Visible" : "Oculta"),
    },
  ];

  return (
    <>
      <Tabla
        columnas={columnas}
        data={data}
        error={error}
        onClickAction={showImage}
        onContextAction={showContextMenu}
      />
    </>
  );
};

export default Banners;

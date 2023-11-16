import { useState, useContext, useEffect } from "react";
import Input, { InputDate, InputImage } from "../../../../components/Input";
import HTMLEditor from "../../../../components/HTMLEditor";
import Modal from "../../../../components/Modal";
import Axios, { urlMain } from "../../../../axios/Axios";
import format from "../../../../assets/format";
import { AlertsContexts } from "../../IndexMenu";
import copyToClipboard from "../../../../assets/copyToClipboard";
import ScrollbarCustom from "../../../../components/ScrollbarCustom";
import NoticiaContent from "../../../../components/NoticiaContent";

function AddNoticias() {
  const { showSuccess, closeAlerts } = useContext(AlertsContexts);
  const date = new Date(Date.now());
  const [showModal, setShowModal] = useState(false);
  const [editorContent, setEditorContent] = useState({ html: "" });
  const [body, setBody] = useState({
    fecha: format.formatFechaDB(date),
  });
  const [imagen, setImagen] = useState({ imagenPrincipal: "" });
  const [localImages, setLocalImages] = useState(
    JSON.parse(localStorage.getItem("localImages")) || []
  );

  const [secondaryImage, setSecondaryImage] = useState({});

  const handle = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBody({ ...body, [name]: value });
  };

  const saveBlog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imagenPrincipal", imagen.imagenPrincipal.file);
    formData.append(
      "contenido",
      JSON.stringify({ ...body, contenido: editorContent.html["__html"] })
    );

    try {
      await Axios.post("/blogs/crear", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      showSuccess();
      setTimeout(() => {
        closeAlerts();
      }, 800);
    } catch (error) {}
  };

  const saveSecondaryImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imagen", secondaryImage.imagen.file);
    try {
      const response = await Axios.post("/blogs/nuevaimagen", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      showSuccess();
      setTimeout(() => {
        closeAlerts();
        setSecondaryImage({});
        e.target.reset();
      }, 800);

      setLocalImages([...localImages, response.data.response]);
    } catch (error) {}
  };

  useEffect(() => {
    localStorage.setItem("localImages", JSON.stringify(localImages));
  }, [localImages]);

  return (
    <div className="h-100 w-100">
      <Modal
        show={showModal}
        close={() => setShowModal(false)}
        title={body.titulo}
        size="md"
        darkMode={true}
      >
        <ScrollbarCustom>
          <img
            className="w-100 mb-3"
            alt="Imagen principal"
            src={imagen.imagenPrincipal.src}
          />
          <p className="text-start w-100"> {format.formatFechaDB(date)}</p>

          <div
            className="w-100"
            dangerouslySetInnerHTML={
              editorContent.html || { __html: "<p>Texto de ejemplo</p>" }
            }
          ></div>
          {body.hasOwnProperty("imagenes") && (
            <div className="d-flex flex-column w-100 align-items-center gap-4">
              {body.imagenes.map((el, i) => (
                <img
                  key={i}
                  className="w-50"
                  alt={`Imagen secundaria ${i}`}
                  src={el}
                />
              ))}
            </div>
          )}
        </ScrollbarCustom>
      </Modal>
      <div className="d-flex w-100 h-100 gap-2">
        <form
          className="h-100 d-flex flex-column flex-grow-1 flex-shrink-2 rounded p-2 bg-dark-mode-base"
          onSubmit={saveBlog}
        >
          <div className="h-90 d-flex flex-column">
            <div className="d-flex gap-2 align-items-center">
              <div className="flex-grow-1">
                <Input
                  label="Titulo de noticia"
                  value={body}
                  name="titulo"
                  handle={handle}
                  required={true}
                />
              </div>
              <InputDate
                label="Mostrar hasta"
                handle={handle}
                value={body}
                name="fechaVigente"
                required={true}
              />
            </div>
            <InputImage
              label="Imagen principal"
              name="imagenPrincipal"
              variable={imagen}
              setVariable={setImagen}
              required={true}
            />
            <HTMLEditor setVariable={setEditorContent} />
          </div>

          {/*         <InputImage
          label="Imagenes secundarias"
          name="imagenes"
          variable={body}
          setVariable={setBody}
          multiple={true}
        /> */}
          <div className="d-flex justify-content-evenly align-items-center">
            <button
              type="submit"
              disabled={!editorContent.hasOwnProperty("json")}
            >
              Guardar
            </button>
            <button type="button" onClick={() => setShowModal(true)}>
              Previsualizar
            </button>
          </div>
        </form>

        <div className="w-25 h-100 d-flex flex-column p-2 overflow-y-hidden rounded bg-dark-mode-base">
          <h4 className="border-bottom">Imagenes</h4>
          <ScrollbarCustom>
            <form onSubmit={saveSecondaryImage}>
              <InputImage
                label="Selecciona la imagen"
                variable={secondaryImage}
                setVariable={setSecondaryImage}
                name="imagen"
                required={true}
              />
              <button type="submit">Subir</button>
            </form>
            {localImages.length > 0 &&
              localImages.map((el) => (
                <div key={el.idimagen} className="d-flex flex-column mb-3">
                  <img alt={"XD"} src={`${urlMain}${el.imagen}`} width="100%" />
                  <button
                    type="button"
                    onClick={() => copyToClipboard(`${urlMain}${el.imagen}`)}
                  >
                    Copiar enlace
                  </button>
                </div>
              ))}
          </ScrollbarCustom>
        </div>
      </div>
    </div>
  );
}

export default AddNoticias;

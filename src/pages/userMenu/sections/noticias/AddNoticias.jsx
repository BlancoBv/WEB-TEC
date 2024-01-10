import { useState, useContext, useEffect } from "react";
import Input, { InputDate, InputImage } from "../../../../components/Input";
import HTMLEditor from "../../../../components/HTMLEditor";
import Modal from "../../../../components/Modal";
import Axios, { multipartHeader, urlMain } from "../../../../axios/Axios";
import format from "../../../../assets/format";
import { AlertsContexts } from "../../IndexMenu";
import copyToClipboard from "../../../../assets/copyToClipboard";
import ScrollbarCustom from "../../../../components/ScrollbarCustom";
import NoticiaContent from "../../../../components/NoticiaContent";
import UploadImages from "../../../../components/UploadImages";

function AddNoticias() {
  const { showSuccess, showError, closeAlerts } = useContext(AlertsContexts);
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
      await Axios.post("/blogs/crear", formData, multipartHeader);
      showSuccess();
    } catch (error) {
      showError();
    }
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
      setSecondaryImage({});
      e.target.reset();

      setLocalImages([...localImages, response.data.response]);
    } catch (error) {
      showError();
    }
  };
  console.log(editorContent);

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
          className="h-100 d-flex flex-column w-75 rounded p-2 bg-dark-mode-base overflow-hidden"
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

        <UploadImages
          variable={secondaryImage}
          setVariable={setSecondaryImage}
          imagesData={localImages}
          save={saveSecondaryImage}
        />
      </div>
    </div>
  );
}

export default AddNoticias;

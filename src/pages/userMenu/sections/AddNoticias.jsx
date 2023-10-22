import { useState, useContext, useEffect } from "react";
import Input, { InputDate, InputImage } from "../../../components/Input";
import HTMLEditor from "../../../components/HTMLEditor";
import Modal from "../../../components/Modal";
import Axios, { urlMain } from "../../../axios/Axios";
import format from "../../../assets/format";
import { AlertsContexts } from "../IndexMenu";
import copyToClipboard from "../../../assets/copyToClipboard";

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

  const saveBlog = async () => {
    const formData = new FormData();
    formData.append("imagenPrincipal", imagen.imagenPrincipal.file);
    formData.append(
      "contenido",
      JSON.stringify({ ...body, contenido: editorContent.html["__html"] })
    );
    console.log(formData);

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
      /* console.log(localImages);
      localStorage.setItem("localImages", JSON.stringify(localImages));
      console.log(response.data.response); */
    } catch (error) {}
  };

  console.log(localImages);

  useEffect(() => {
    localStorage.setItem("localImages", JSON.stringify(localImages));
  }, [localImages]);

  return (
    <div className="d-flex flex-column h-100 w-100">
      <Modal
        show={showModal}
        close={() => setShowModal(false)}
        title={body.titulo}
      >
        <img
          className="w-100 mb-3"
          alt="Imagen principal"
          src={imagen.imagenPrincipal.src}
        />

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
      </Modal>
      <div className="d-flex w-100 h-90">
        <div className="h-90 d-flex flex-column w-75">
          <div className="d-flex gap-2 align-items-center">
            <div className="flex-grow-1">
              <Input
                label="Titulo de noticia"
                value={body}
                name="titulo"
                handle={handle}
              />
            </div>
            <InputDate
              label="Mostrar hasta"
              handle={handle}
              value={body}
              name="fechaVigente"
            />
          </div>
          <InputImage
            label="Imagen principal"
            name="imagenPrincipal"
            variable={imagen}
            setVariable={setImagen}
          />
          <HTMLEditor setVariable={setEditorContent} />
          {/*         <InputImage
          label="Imagenes secundarias"
          name="imagenes"
          variable={body}
          setVariable={setBody}
          multiple={true}
        /> */}
        </div>
        <div className="w-25 h-90 d-flex flex-column m-2 border-start p-2 overflow-y-auto">
          <h4 className="border-bottom">Imagenes</h4>
          <form onSubmit={saveSecondaryImage}>
            <InputImage
              label="Selecciona la imagen"
              variable={secondaryImage}
              setVariable={setSecondaryImage}
              name="imagen"
            />
            <button type="submit">Subir</button>
          </form>
          {localImages.length > 0 &&
            localImages.map((el) => (
              <div key={el.idimagen} className="d-flex flex-column mb-3">
                <img alt={"XD"} src={`${urlMain}${el.imagen}`} />
                <button
                  type="button"
                  onClick={() => copyToClipboard(`${urlMain}${el.imagen}`)}
                >
                  Copiar enlace
                </button>
              </div>
            ))}
        </div>
      </div>
      <div className="d-flex justify-content-evenly align-items-center">
        <button onClick={saveBlog}>Guardar</button>
        <button onClick={() => setShowModal(true)}>Previsualizar</button>
      </div>
    </div>
  );
}

export default AddNoticias;

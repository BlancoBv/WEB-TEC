import { useState, useContext, useEffect } from "react";
import Input, { InputDate, InputImage } from "../../../../components/Input";
import HTMLEditor from "../../../../components/HTMLEditor";
import Modal from "../../../../components/Modal";
import Axios, { multipartHeader, urlMain } from "../../../../axios/Axios";
import format from "../../../../assets/format";
import { AlertsContexts } from "../../IndexMenu";
import ScrollbarCustom from "../../../../components/ScrollbarCustom";
import UploadImages from "../../../../components/UploadImages";
import Button from "../../../../components/Button";

function AddNoticias() {
  const { showSuccess, showError } = useContext(AlertsContexts);
  const [pending, setPending] = useState(false);
  const date = new Date(Date.now());
  const [showModal, setShowModal] = useState(false);
  const [editorContent, setEditorContent] = useState({ html: "" });
  const [body, setBody] = useState({
    fecha: format.formatFechaDB(date),
  });
  const [imagen, setImagen] = useState({ imagenPrincipal: {} });

  const handle = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBody({ ...body, [name]: value });
  };

  const saveBlog = async (e) => {
    setPending(true);
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
      setImagen({ imagenPrincipal: {} });
      setBody({
        fecha: format.formatFechaDB(date),
      });
      setEditorContent({ html: "" });
    } catch (error) {
      showError();
    }
    setPending(false);
  };

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
          className="h-100 d-flex flex-column w-75 rounded p-2 bg-dark-mode-base"
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
            <div className="d-flex flex-grow-1 overflow-y-auto">
              <HTMLEditor setVariable={setEditorContent} />
            </div>
          </div>

          <div className="d-flex justify-content-evenly align-items-center h-10 p-2">
            <Button text="Previsualizar" action={() => setShowModal(true)} />
            <Button
              text="Guardar"
              type="submit"
              disabled={!editorContent.hasOwnProperty("json")}
              pending={pending}
            />
          </div>
        </form>

        <UploadImages />
      </div>
    </div>
  );
}

export default AddNoticias;

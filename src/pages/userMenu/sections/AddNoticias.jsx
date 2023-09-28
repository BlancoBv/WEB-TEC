import { useState } from "react";
import Input, { InputImage } from "../../../components/Input";
import HTMLEditor from "../../../components/HTMLEditor";
import Modal from "../../../components/Modal";
import Axios from "../../../axios/Axios";

function AddNoticias() {
  const [showModal, setShowModal] = useState(false);
  const [editorContent, setEditorContent] = useState({ html: "" });
  const [body, setBody] = useState({
    /* titulo: "", */ imagenPrincipal: "",
    fechaVigente: " ",
  });

  const handle = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBody({ ...body, [name]: value });
  };

  const saveBlog = async () => {
    try {
      await Axios.post("/blogs/crear", {
        content: editorContent.html["__html"],
        imagenes: body.imagenes,
        imagenPrincipal: body.imagenPrincipal[0],
        fechaVigente: body.fechaVigente,
      });
    } catch (error) {}
  };
  console.log(body);

  return (
    <div>
      <Modal
        show={showModal}
        close={() => setShowModal(false)}
        title={body.titulo}
      >
        <img
          className="w-100 mb-3"
          alt="Imagen principal"
          src={body.imagenPrincipal}
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
      <div className="h-90 d-flex flex-column">
        {/*         <Input
          label="Titulo de noticia"
          value={body}
          name="titulo"
          handle={handle}
        /> */}
        <InputImage
          label="Imagen principal"
          name="imagenPrincipal"
          variable={body}
          setVariable={setBody}
        />
        <HTMLEditor setVariable={setEditorContent} />
        <InputImage
          label="Imagenes secundarias"
          name="imagenes"
          variable={body}
          setVariable={setBody}
          multiple={true}
        />
        <input
          type="date"
          name="fechaVigente"
          onChange={handle}
          value={body.fechaVigente}
        />
      </div>
      <div className="d-flex justify-content-evenly align-items-center">
        <button onClick={saveBlog}>Guardar</button>
        <button onClick={() => setShowModal(true)}>Previsualizar</button>
      </div>
    </div>
  );
}

export default AddNoticias;

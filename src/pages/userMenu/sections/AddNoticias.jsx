import { useState } from "react";
import Input, { InputImage } from "../../../components/Input";
import HTMLEditor from "../../../components/HTMLEditor";
import Modal from "../../../components/Modal";
import Axios from "../../../axios/Axios";

function AddNoticias() {
  const [showModal, setShowModal] = useState(false);
  const [editorContent, setEditorContent] = useState({ html: "" });
  const [body, setBody] = useState({ titulo: "", imagenPrincipal: "" });
  const [banner, setBanner] = useState({ imagen: "" });

  const handle = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBody({ ...body, [name]: value });
  };

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
        {body.hasOwnProperty("imagenesSecundarias") && (
          <div className="d-flex flex-column w-100 align-items-center gap-4">
            {body.imagenesSecundarias.map((el, i) => (
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
        <Input
          label="Titulo de noticia"
          value={body}
          name="titulo"
          handle={handle}
        />
        <InputImage
          label="Imagen principal"
          name="imagenPrincipal"
          variable={body}
          setVariable={setBody}
        />
        <HTMLEditor setVariable={setEditorContent} />
        <InputImage
          label="Imagenes secundarias"
          name="imagenesSecundarias"
          variable={body}
          setVariable={setBody}
          multiple={true}
        />

        {/* <div className="mt-3 border-top">
          <form onSubmit={saveBanner}>
            <InputImage
              label="Subir banner"
              name="imagen"
              variable={banner}
              setVariable={setBanner}
            />
            <button type="submit">Guardar banner</button>
          </form>
        </div> */}
      </div>
      <div className="d-flex justify-content-evenly align-items-center">
        <button>Guardar</button>
        <button onClick={() => setShowModal(true)}>Previsualizar</button>
      </div>
    </div>
  );
}

export default AddNoticias;

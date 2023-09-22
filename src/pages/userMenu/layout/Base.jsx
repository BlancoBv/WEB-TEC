import React, { useState } from "react";
import HTMLEditor from "../../../components/HTMLEditor";
import Modal from "../../../components/Modal";
import Input from "../../../components/Input";

function Base() {
  const [showModal, setShowModal] = useState(false);
  const [editorContent, setEditorContent] = useState({ html: "" });
  const [body, setBody] = useState({ titulo: "", imagenPrincipal: "" });

  const handle = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBody({ ...body, [name]: value });
  };

  const handleImage = (e) => {
    e.preventDefault();
    console.log(e);
    const { name, value, files } = e.target;

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      console.log("image data: ", e.target.result);
      setBody({ ...body, [name]: e.target.result });
    };
  };

  console.log(editorContent);
  return (
    <div className="vw-100 vh-100 d-flex">
      <Modal
        show={showModal}
        close={() => setShowModal(false)}
        title={body.titulo}
      >
        <img
          className="w-100"
          alt="Imagen principal"
          src={body.imagenPrincipal}
        />
        <div
          className="w-100"
          dangerouslySetInnerHTML={
            editorContent.html || { __html: "<p>Texto de ejemplo</p>" }
          }
        ></div>
      </Modal>
      <div className="border w-15 d-flex flex-column">
        <span>Añadir noticia</span>
      </div>
      <div className="border w-85 p-2">
        <div className="h-90 d-flex flex-column">
          <Input
            label="Titulo de noticia"
            value={body}
            name="titulo"
            handle={handle}
          />
          <input
            className="form-control"
            type="file"
            //value={body.imagenPrincipal}
            name="imagenPrincipal"
            onChange={handleImage}
            accept="image/*"
          />
          XDD
          <HTMLEditor setVariable={setEditorContent} />
        </div>
        <div className="d-flex justify-content-evenly align-items-center">
          <button>Guardar</button>
          <button onClick={() => setShowModal(true)}>Previsualizar</button>
        </div>
      </div>
    </div>
  );
}

export default Base;

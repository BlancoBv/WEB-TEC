import React, { useState } from "react";
import HTMLEditor from "../../../components/HTMLEditor";
import Modal from "../../../components/Modal";
import Input, { InputImage } from "../../../components/Input";
import { convertFromRaw } from "draft-js";

function Base() {
  const [showModal, setShowModal] = useState(false);
  const [editorContent, setEditorContent] = useState({ html: "" });
  const [body, setBody] = useState({ titulo: "", imagenPrincipal: "" });

  const handle = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBody({ ...body, [name]: value });
  };

  return (
    <div className="vw-100 vh-100 d-flex">
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

import React, { useState } from "react";
import HTMLEditor from "../../../../components/HTMLEditor";
import { useParams } from "react-router-dom";
import useGetData from "../../../../hooks/useGetData";
import Axios from "../../../../axios/Axios";
import Input from "../../../../components/Input";
import format from "../../../../assets/format";
import Loader from "../../../../components/Loader";
import { convertFromRaw, convertToRaw } from "draft-js";
import { convertFromHTML } from "draft-convert";
import htmlToDraft from "html-to-draftjs";

function EditArticulos() {
  const { ruta } = useParams();
  const date = new Date(Date.now());
  const [editorContent, setEditorContent] = useState({});
  const [body, setBody] = useState({
    fecha: format.formatFechaDB(date),
  });
  const { data, isPending } = useGetData(`/articulos/obtener/${ruta}`);

  const closeWindow = () => {
    window.close();
  };
  const save = async () => {
    try {
      await Axios.post("/articulos/crear", {
        ...body,
        contenido: editorContent.html["__html"],
        ruta,
      });
    } catch (error) {}
  };
  const handle = (e) => {
    const { name, value } = e.target;
    setBody({ ...body, [name]: value });
  };
  const update = async () => {
    await Axios.put(`/articulos/editar/${data.response.idarticulo}`, {
      ...body,
      contenido: editorContent.html["__html"],
      ruta,
    });
  };
  console.log(!isPending && convertFromHTML(data.response.contenido));
  return (
    <>
      {!isPending ? (
        <div className="w-100 h-100 bg-dark-mode text-white d-flex gap-2 p-2">
          <div className="rounded bg-dark-mode-base w-50 p-2">
            <Input
              label="Titulo del articulo"
              placeholder="Titulo"
              handle={handle}
              name="titulo"
              value={body}
            />
            <HTMLEditor
              setVariable={setEditorContent}
              initialContent={
                data.response && htmlToDraft(data.response.contenido)
              }
            />
            <button type="button" onClick={closeWindow}>
              Cerrar
            </button>
            <button type="button" onClick={data.response ? update : save}>
              Guardar
            </button>
          </div>
          <div className="rounded bg-dark-mode-base w-50">
            <div dangerouslySetInnerHTML={editorContent.html} />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default EditArticulos;

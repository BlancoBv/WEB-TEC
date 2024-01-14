import React, { useState } from "react";
import HTMLEditor from "../../../../components/HTMLEditor";
import { useNavigate, useParams } from "react-router-dom";
import useGetData from "../../../../hooks/useGetData";
import Axios from "../../../../axios/Axios";
import Input from "../../../../components/Input";
import format from "../../../../assets/format";
import Loader from "../../../../components/Loader";
import { convertFromHTML } from "draft-convert";
import htmlToDraft from "html-to-draftjs";
import UploadImages from "../../../../components/UploadImages";

function EditArticulos() {
  const navigate = useNavigate();
  const { ruta } = useParams();
  const date = new Date(Date.now());
  const [editorContent, setEditorContent] = useState({});
  const [body, setBody] = useState({
    fecha: format.formatFechaDB(date),
  });
  const [contenido, setContenido] = useState({});
  const { data, isPending } = useGetData(`/articulos/obtener/${ruta}`);

  const closeWindow = () => {
    navigate("/panel/menus-control");
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
  const handleContenido = (e) => {
    const { name, value } = e.target;
    setContenido({ ...contenido, [name]: value });
  };
  const update = async () => {
    await Axios.put(`/articulos/editar/${data.response.idarticulo}`, {
      titulo: body["titulo"],
      fecha: body["fecha"],
      contenido: JSON.stringify({
        contenidoPrincipal: editorContent.html["__html"],
        ...contenido,
      }),
      ruta,
    });
  };
  console.log(contenido);
  return (
    <>
      {!isPending ? (
        <div className="w-100 h-100 bg-dark-mode text-white d-flex gap-2">
          <div className="rounded bg-dark-mode-base w-75 h-100 p-2">
            <Input
              label="Titulo del articulo"
              placeholder="Titulo"
              handle={handle}
              name="titulo"
              value={body}
            />
            <Input
              name="background"
              label="Imagen de fondo"
              value={contenido}
              handle={handleContenido}
            />
            <Input
              name="foreground"
              label="Imagen de fondo"
              value={contenido}
              handle={handleContenido}
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

          <UploadImages />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default EditArticulos;

import React, { useEffect, useState } from "react";
import HTMLEditor from "../../../../components/HTMLEditor";
import { useNavigate, useParams } from "react-router-dom";
import useGetData from "../../../../hooks/useGetData";
import Axios from "../../../../axios/Axios";
import Input from "../../../../components/Input";
import format from "../../../../assets/format";
import Loader from "../../../../components/Loader";
import htmlToDraft from "html-to-draftjs";
import UploadImages from "../../../../components/UploadImages";

function EditArticulos() {
  const { ruta } = useParams();
  const { data, isPending } = useGetData(`/articulos/obtener/${ruta}`);

  return (
    <>
      {!isPending ? <Success data={data.response} ruta={ruta} /> : <Loader />}
    </>
  );
}
const Success = ({ data, ruta }) => {
  const navigate = useNavigate();
  const { background, foreground, contenidoPrincipal } = data
    ? JSON.parse(data.contenido)
    : {};
  const date = new Date(Date.now());
  const [editorContent, setEditorContent] = useState({});
  const [body, setBody] = useState({
    fecha: format.formatFechaDB(date),
    titulo: data ? data.titulo : "",
  });
  const [contenido, setContenido] = useState({ background, foreground });

  const closeWindow = () => {
    navigate("/panel/menus-control");
  };
  const save = async (e) => {
    e.preventDefault();
    console.log("ola");
    try {
      await Axios.post("/articulos/crear", {
        ...body,
        ruta,
        contenido: JSON.stringify({
          contenidoPrincipal: editorContent.html["__html"],
          ...contenido,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handle = (e) => {
    const { name, value } = e.target;
    setBody({ ...body, [name]: value });
  };
  const handleContenido = (e) => {
    const { name, value } = e.target;
    setContenido({ ...contenido, [name]: value });
  };
  const update = async (e) => {
    e.preventDefault();
    await Axios.put(`/articulos/editar/${data.idarticulo}`, {
      titulo: body["titulo"],
      fecha: body["fecha"],
      contenido: JSON.stringify({
        contenidoPrincipal: editorContent.html["__html"],
        ...contenido,
      }),
      ruta,
    });
  };

  return (
    <div className="w-100 h-100 bg-dark-mode text-white d-flex gap-2">
      <form
        onSubmit={data ? update : save}
        className="rounded bg-dark-mode-base w-75 h-100 p-2"
      >
        <div className="d-flex flex-column h-90">
          <Input
            label="Titulo del articulo"
            placeholder="Titulo"
            handle={handle}
            name="titulo"
            value={body}
          />
          <Input
            name="background"
            label="Imagen de fondo del encabezado"
            value={contenido}
            handle={handleContenido}
            placeholder="Enlace"
          />
          <Input
            name="foreground"
            label="Imagen frontal del encabezado"
            value={contenido}
            handle={handleContenido}
            placeholder="Enlace"
          />
          <div className="d-flex flex-grow-1 w-100 overflow-y-auto">
            <HTMLEditor
              setVariable={setEditorContent}
              initialContent={data && htmlToDraft(contenidoPrincipal)}
            />
          </div>
        </div>
        <div className="h-10">
          <button type="button" onClick={closeWindow}>
            Cerrar
          </button>
          <button type="submit">Guardar</button>
        </div>
      </form>

      <UploadImages />
    </div>
  );
};

export default EditArticulos;

import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetData from "../../../../hooks/useGetData";
import Loader from "../../../../components/Loader";
import Button from "../../../../components/Button";
import Input, { InputDate } from "../../../../components/Input";
import HTMLEditor from "../../../../components/HTMLEditor";
import htmlToDraft from "html-to-draftjs";
import UploadImages from "../../../../components/UploadImages";
import format from "../../../../assets/format";
import Axios from "../../../../axios/Axios";
import { AlertsContexts } from "../../IndexMenu";

function EditarNoticia() {
  const { idNoticia } = useParams();
  const { data, isPending, error } = useGetData(
    `/blogs/obtenerxidblog/${idNoticia}`
  );

  return (
    <div className="h-100 w-100">
      {isPending && (
        <div className="h-100 w-100 d-flex align-items-center justify-content-center">
          <Loader />
        </div>
      )}
      {!isPending && !error && (
        <Success data={data.response} idBlog={idNoticia} />
      )}
    </div>
  );
}

const Success = ({ data, idBlog }) => {
  const { showSuccess, showError } = useContext(AlertsContexts);
  const { titulo, fechavigente, fecha } = data;
  const navigate = useNavigate();
  console.log(data);
  const [body, setBody] = useState({
    titulo,
    fechaVigente: format.formatFechaDB(fechavigente),
    fecha,
  });
  const [editorContent, setEditorContent] = useState({});
  const handle = (e) => {
    const { name, value } = e.target;
    setBody((prev) => ({ ...prev, [name]: value }));
  };

  const update = async (e) => {
    e.preventDefault();
    try {
      await Axios.put(`/blogs/actualizarxidblog/${idBlog}`, {
        ...body,
        contenido: editorContent.html["__html"],
      });
      showSuccess();
      navigate("..");
    } catch (error) {
      showError();
    }
  };
  return (
    <div className="d-flex h-100 gap-2">
      <form
        onSubmit={update}
        className="rounded bg-dark-mode-base w-75 h-100 p-2"
      >
        <div className="d-flex flex-column h-90">
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
          {/* <Input
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
          /> */}
          <div className="d-flex flex-grow-1 w-100 overflow-y-auto">
            <HTMLEditor
              setVariable={setEditorContent}
              initialContent={htmlToDraft(data.contenido)}
            />
          </div>
        </div>
        <div className="h-10">
          <button type="button" onClick={() => navigate("..")}>
            Cerrar
          </button>
          <Button type="submit" text="Guardar" />
        </div>
      </form>
      <UploadImages />
    </div>
  );
};

export default EditarNoticia;

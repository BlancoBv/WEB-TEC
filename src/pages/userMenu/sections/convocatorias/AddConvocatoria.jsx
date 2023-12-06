import React, { useContext, useState } from "react";
import Input, {
  InputFile,
  InputImage,
  InputTextArea,
} from "../../../../components/Input";
import ScrollbarCustom from "../../../../components/ScrollbarCustom";
import PDFViewer from "../../../../components/PDFViewer";
import format from "../../../../assets/format";
import Axios, { multipartHeader } from "../../../../axios/Axios";
import { AlertsContexts } from "../../IndexMenu";

function AddConvocatoria() {
  const date = new Date(Date.now());
  const [image, setImage] = useState({ imagen: "" });
  const [pdf, setPdf] = useState({ pdf: "" });
  const [body, setBody] = useState({ fecha: format.formatFechaDB(date) });
  const { showSuccess, showError } = useContext(AlertsContexts);

  const save = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("pdf", pdf.pdf.file);
    formData.append("imagen", image.imagen.file);
    formData.append("body", JSON.stringify(body));
    console.log(formData);
    try {
      await Axios.post("/convocatorias/crear", formData, multipartHeader);
      showSuccess();
    } catch (error) {
      showError();
    }
  };
  const handle = (e) => {
    const { name, value } = e.target;
    setBody({ ...body, [name]: value });
  };
  console.log(body);

  return (
    <form className="h-100 w-100 d-flex gap-2 " onSubmit={save}>
      <div className="w-50 p-2 bg-dark-mode-base rounded d-flex flex-column">
        <h3>Imagen de la convocatoria</h3>
        <InputImage
          label="Selecciona la imagen"
          name="imagen"
          variable={image}
          setVariable={setImage}
          required={true}
        />
        {image.imagen.hasOwnProperty("src") ? (
          <div className="w-100 d-flex justify-content-center">
            <img
              src={image.imagen.src}
              width="350px"
              height="400px"
              className="image-fit rounded"
              alt="Previsualización de imagen"
            />
          </div>
        ) : (
          <i>Sin imagen para previsualizar</i>
        )}
      </div>
      <div className="w-50 d-flex flex-column gap-2 ">
        <div className="h-75 p-2 d-flex flex-column bg-dark-mode-base rounded overflow-y-hidden">
          <h3>Archivo PDF o enlace</h3>
          <InputFile
            name="pdf"
            variable={pdf}
            setVariable={setPdf}
            required={true}
          />

          <ScrollbarCustom>
            {pdf.pdf.hasOwnProperty("src") && <PDFViewer url={pdf.pdf.src} />}
          </ScrollbarCustom>
        </div>
        <div className="h-25 d-flex p-2 bg-dark-mode-base rounded gap-2">
          <div className="d-flex flex-column justify-content-evenly w-50">
            <Input
              label="Titulo de la convocatoria"
              required={true}
              handle={handle}
              value={body}
              name="titulo"
            />
            <button type="submit">Guardar</button>
          </div>
          <div className="w-50 h-100">
            <InputTextArea
              label="Descripción de la convocatoria"
              required={true}
              handle={handle}
              value={body}
              name="descripcion"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddConvocatoria;

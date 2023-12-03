import React, { useState } from "react";
import UploadImages from "../../../../components/UploadImages";
import { InputFile, InputImage } from "../../../../components/Input";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import ScrollbarCustom from "../../../../components/ScrollbarCustom";
import Loader from "../../../../components/Loader";

function AddConvocatoria() {
  const [image, setImage] = useState({ imagen: "" });
  const [pdf, setPdf] = useState({ pdf: "" });
  console.log(pdf);
  return (
    <div className="h-100 w-100 d-flex gap-2 ">
      <div className="w-50 p-2 bg-dark-mode-base rounded d-flex flex-column">
        <h3>Imagen de la convocatoria</h3>
        <InputImage
          label="Selecciona la imagen"
          name="imagen"
          variable={image}
          setVariable={setImage}
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
        <div className="h-50 p-2 bg-dark-mode-base rounded overflow-y-hidden">
          <h3>Archivo PDF o enlace</h3>
          <InputFile name="pdf" variable={pdf} setVariable={setPdf} />

          {/* <ScrollbarCustom height="100%">
            {pdf.pdf.hasOwnProperty("src") && (
              <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
                <Viewer fileUrl={pdf.pdf.src} renderLoader={() => <Loader />} />
              </Worker>
            )}
          </ScrollbarCustom> */}
        </div>
      </div>
    </div>
  );
}

export default AddConvocatoria;

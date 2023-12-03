import ScrollbarCustom from "./ScrollbarCustom";
import { InputImage } from "./Input";

function UploadImages({ save, variable, setVariable, imagesData }) {
  return (
    <div className="w-25 h-100 d-flex flex-column p-2 overflow-y-hidden rounded bg-dark-mode-base">
      <h4 className="border-bottom">Imagenes</h4>
      <ScrollbarCustom>
        <form onSubmit={save}>
          <InputImage
            label="Selecciona la imagen"
            variable={variable}
            setVariable={setVariable}
            name="imagen"
            required={true}
          />
          <button type="submit">Subir</button>
        </form>
        {imagesData.length > 0 &&
          imagesData.map((el) => (
            <div key={el.idimagen} className="d-flex flex-column mb-3">
              <img alt={"XD"} src={`${urlMain}${el.imagen}`} width="100%" />
              <button
                type="button"
                onClick={() => copyToClipboard(`${urlMain}${el.imagen}`)}
              >
                Copiar enlace
              </button>
            </div>
          ))}
      </ScrollbarCustom>
    </div>
  );
}

export default UploadImages;

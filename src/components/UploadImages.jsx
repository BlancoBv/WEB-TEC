import { useState, useEffect } from "react";
import ScrollbarCustom from "./ScrollbarCustom";
import { InputImage } from "./Input";
import { useContext } from "react";
import { AlertsContexts } from "../pages/userMenu/IndexMenu";
import Axios, { multipartHeader } from "../axios/Axios";
import { urlMain } from "../axios/Axios";
import copyToClipboard from "../assets/copyToClipboard";

function UploadImages() {
  const [image, setImage] = useState({});
  const { showSuccess, showError } = useContext(AlertsContexts);
  const [localImages, setLocalImages] = useState(
    JSON.parse(localStorage.getItem("localImages")) || []
  );

  const save = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imagen", image.imagen.file);
    console.log(formData);
    try {
      const response = await Axios.post(
        "/blogs/nuevaimagen",
        formData,
        multipartHeader
      );
      showSuccess();
      setImage({});
      e.target.reset();

      setLocalImages([...localImages, response.data.response]);
    } catch (error) {
      showError();
    }
  };
  useEffect(() => {
    localStorage.setItem("localImages", JSON.stringify(localImages));
  }, [localImages]);
  return (
    <div className="w-25 h-100 d-flex flex-column p-2 overflow-y-hidden rounded bg-dark-mode-base">
      <h4 className="border-bottom">Imagenes</h4>
      <ScrollbarCustom>
        <form onSubmit={save}>
          <InputImage
            label="Selecciona la imagen"
            variable={image}
            setVariable={setImage}
            name="imagen"
            required={true}
          />
          <button type="submit">Subir</button>
        </form>
        {localImages.length > 0 &&
          localImages.map((el) => (
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

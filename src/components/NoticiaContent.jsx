import ScrollbarCustom from "./ScrollbarCustom";
import { urlMain } from "../axios/Axios";
import format from "../assets/format";

function NoticiaContent({ data }) {
  console.log(data);
  return (
    <ScrollbarCustom>
      <div className="d-flex flex-column w-100 align-items-center">
        <img
          src={`${urlMain}${data.imagen}`}
          alt="Imagen principal"
          width="75%"
        />
        <i className="text-start w-100 fw-bold">
          {format.formatFecha(data.updatedAt || null, "full")}
        </i>
        <div
          className="w-100"
          dangerouslySetInnerHTML={{ __html: data.contenido }}
        ></div>
      </div>
    </ScrollbarCustom>
  );
}

export default NoticiaContent;

import ScrollbarCustom from "./ScrollbarCustom";
import { urlMain } from "../axios/Axios";
import format from "../assets/format";
import { NavLink } from "react-router-dom";

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
        {data.etiquetas && (
          <div className="border-top w-100 p-2">
            {/* <span>
            <i className="fa-solid fa-tags" /> Etiquetas
          </span> */}
            <div className="w-100 justify-content-evenly d-flex flex-wrap">
              {data.etiquetas.map((etiqueta) => (
                <NavLink to={`/search/${etiqueta.etiqueta}`} reloadDocument>
                  <i className="fa-solid fa-tag" />
                  {etiqueta.etiqueta}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </ScrollbarCustom>
  );
}

export default NoticiaContent;

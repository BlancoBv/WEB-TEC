import { useState } from "react";
import Modal from "./Modal";
import { urlMain } from "../axios/Axios";
import NoticiaContent from "./NoticiaContent";
import format from "../assets/format";
import Button from "./Button";
function NoticiaCard({ element }) {
  const [showViewer, setShowViewer] = useState({
    status: false,
    idNoticia: "",
  });

  return (
    <div className="noticia-card">
      <h5>{element.titulo}</h5>
      <div className="position-relative noticia-imagen">
        <img src={`${urlMain}${element.imagen}`} />
        <span className="position-absolute bottom-0 start-0 text-white p-2">
          {format.formatFecha(element.updatedAt, "full")}
        </span>
      </div>

      <div className="d-flex justify-content-start w-100">
        <Button
          text="Ver noticia"
          action={() =>
            setShowViewer({ status: true, idNoticia: element.idblog })
          }
        />
      </div>

      <Modal
        show={showViewer.status}
        close={() => setShowViewer({ status: false, idNoticia: "" })}
        title={element.titulo}
        size="md"
      >
        <NoticiaContent data={element} />
      </Modal>
    </div>
  );
}

export default NoticiaCard;

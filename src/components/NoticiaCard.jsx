import { useState } from "react";
import Modal from "./Modal";
import { urlMain } from "../axios/Axios";
import useGetData from "../hooks/useGetData";
import NoticiaContent from "./NoticiaContent";
import format from "../assets/format";

function NoticiaCard({ element }) {
  console.log(element);
  const [showViewer, setShowViewer] = useState({
    status: false,
    idNoticia: "",
  });

  return (
    <div className="noticia-card">
      <h4>{element.titulo}</h4>
      <div className="position-relative noticia-imagen">
        <img src={`${urlMain}${element.imagen}`} />
        <span className="position-absolute bottom-0 start-0 text-white p-2">
          {format.formatFecha(element.updatedAt, "full")}
        </span>
      </div>

      <div className="d-flex justify-content-start w-100">
        <button
          onClick={() =>
            setShowViewer({ status: true, idNoticia: element.idblog })
          }
        >
          Abrir
        </button>
      </div>

      <Modal
        show={showViewer.status}
        close={() => setShowViewer({ status: false, idNoticia: "" })}
        title={element.titulo}
        size="md"
      >
        {/* <div className="d-flex flex-column w-100 align-items-center">
          <img
            src={`${urlMain}${element.imagen}`}
            alt="Imagen principal"
            width="75%"
          />
          <p className="text-start w-100">{element.updatedAt}</p>
          <div
            className="w-100"
            dangerouslySetInnerHTML={{ __html: element.contenido }}
          ></div>
        </div> */}
        <NoticiaContent data={element} />
      </Modal>
    </div>
  );
}

/* const ModalNoticia = ({ viewerState }) => {
  const [showViewer, setShowViewer] = viewerState;
  console.log(showViewer);
  const { data, isPending, error } = useGetData(
    `/blogs/obtenerxidblog/${showViewer.idNoticia}`
  );

  return (
    <>
      {!isPending && !error && (
        <Success
          data={data.response}
          viewerState={viewerState}
          setShowViewer={setShowViewer}
          showViewer={showViewer}
        />
      )}
    </>
  );
}; */

/* const Success = ({ data, setShowViewer, showViewer }) => {
  console.log(data, "ola");
  return (
    <Modal
      show={showViewer.status}
      close={() => setShowViewer({ status: false, idNoticia: "" })}
      title={data.titulo}
      size="md"
    >
      <div className="d-flex flex-column w-100 align-items-center">
        <img
          src={`${urlMain}${data.imagen}`}
          alt="Imagen principal"
          width="75%"
        />
        <p className="text-start w-100">{data.updatedAt}</p>
        <div
          className="w-100"
          dangerouslySetInnerHTML={{ __html: data.contenido }}
        ></div>
      </div>
    </Modal>
  );
}; */
export default NoticiaCard;

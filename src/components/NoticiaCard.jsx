import { useState } from "react";
import Modal from "./Modal";
import { urlMain } from "../axios/Axios";
import UseGetData from "../hooks/UseGetData";

function NoticiaCard({ element }) {
  const [showViewer, setShowViewer] = useState({
    status: false,
    idNoticia: "",
  });

  return (
    <div className="noticia-card border d-flex flex-column align-items-center">
      <div className="position-relative noticia-imagen">
        <img src={`${urlMain}${element.imagen}`} />
        <span className="position-absolute bottom-0 start-0 blueBackground text-white p-2">
          {element.updatedAt}
        </span>
      </div>
      <h5>{element.title}</h5>
      <div className="d-flex justify-content-start w-100">
        <button
          onClick={() =>
            setShowViewer({ status: true, idNoticia: element.idblog })
          }
        >
          Leer más
        </button>
      </div>
      <ModalNoticia viewerState={[showViewer, setShowViewer]} />
    </div>
  );
}

const ModalNoticia = ({ viewerState }) => {
  const [showViewer, setShowViewer] = viewerState;
  console.log(showViewer);
  const { data, isPending, error } = UseGetData(
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
};

const Success = ({ data, setShowViewer, showViewer }) => {
  console.log(data);
  return (
    <Modal
      show={showViewer.status}
      close={() => setShowViewer({ status: false, idNoticia: "" })}
      title={"ola"}
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
          dangerouslySetInnerHTML={{ __html: data.content }}
        ></div>
        {data.imagenes_blogs.map((el, i) => (
          <img
            key={i}
            className="w-50 mb-2"
            alt={`Imagen secundaria ${i}`}
            src={`${urlMain}${el.imagen}`}
          />
        ))}
      </div>
    </Modal>
  );
};
export default NoticiaCard;

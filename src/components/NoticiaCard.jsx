import { useState } from "react";
import Modal from "./Modal";

function NoticiaCard({ element }) {
  const [showViewer, setShowViewer] = useState(false);

  return (
    <div className="noticia-card border d-flex flex-column align-items-center">
      <div className="position-relative noticia-imagen">
        <img src={element.img} />
        <span className="position-absolute bottom-0 start-0 blueBackground text-white p-2">
          {element.fecha}
        </span>
      </div>
      <h5>{element.title}</h5>
      <div className="d-flex justify-content-start w-100">
        <button onClick={() => setShowViewer(true)}>Leer más</button>
      </div>
      <Modal
        show={showViewer}
        data={element}
        close={() => setShowViewer(false)}
        title={element.title}
      />
    </div>
  );
}

export default NoticiaCard;

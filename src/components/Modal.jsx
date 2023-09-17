import { createPortal } from "react-dom";

function Modal({ show, close, title, children }) {
  return (
    <>
      {show &&
        createPortal(
          <div className="modal-container d-flex align-items-center justify-content-center">
            <div className="modal-box bg-white d-flex flex-column">
              <div className="modal-title border-bottom">
                <h5>{title}</h5>
                <i
                  className="fa-solid fa-x text-danger modal-button-close fs-5"
                  title="Cerrar"
                  role="button"
                  onClick={close}
                />
              </div>
              <div className="flex-fill overflow-y-auto modal-cuerpo">
                {children}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default Modal;

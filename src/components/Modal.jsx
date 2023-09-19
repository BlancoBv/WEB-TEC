import { useTransition, animated } from "@react-spring/web";
import { createPortal } from "react-dom";

function Modal({ show, close, title, children }) {
  const transitions = useTransition(show, {
    from: { x: 0, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 0, opacity: 0 },
  });

  return createPortal(
    transitions(
      (style, item) =>
        item && (
          <animated.div
            style={style}
            className="modal-container d-flex align-items-center justify-content-center"
          >
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
          </animated.div>
        )
    ),
    document.body
  );
}

export default Modal;

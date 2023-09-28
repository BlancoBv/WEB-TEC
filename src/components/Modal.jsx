import { useTransition, animated } from "@react-spring/web";
import { createPortal } from "react-dom";
import { useHotkeys } from "react-hotkeys-hook";

function Modal({ show, close, title, children }) {
  useHotkeys("esc", () => close());

  const transitions = useTransition(show, {
    from: { x: 0, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 0, opacity: 0 },
    config: { duration: 300 },
  });

  return createPortal(
    transitions(
      (style, item) =>
        item && (
          <animated.div
            style={style}
            className="modal-container d-flex align-items-center justify-content-center"
            /*  onClick={close} */
          >
            <div className="modal-box bg-white d-flex flex-column">
              <div className="modal-title border-bottom">
                <h5>{title}</h5>
                <span
                  className="modal-button-close p-2 d-flex justify-content-center align-items-center"
                  title="Cerrar"
                  role="button"
                  onClick={close}
                >
                  <i className="fa-solid fa-x fs-5" />
                </span>
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

export const ModalConfirm = ({ show, close, title, children, action }) => {
  useHotkeys("esc", () => close());

  const transitions = useTransition(show, {
    from: { x: 0, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 0, opacity: 0 },
    config: { duration: 300 },
  });

  return createPortal(
    transitions(
      (style, item) =>
        item && (
          <animated.div
            style={style}
            className="modal-container d-flex align-items-center justify-content-center"
            onClick={close}
          >
            <div className="modal-box bg-white d-flex flex-column w-25 h-25">
              <div className="modal-title border-bottom h-30">
                <h5>{title}</h5>
                <span
                  className="modal-button-close p-2 d-flex justify-content-center align-items-center"
                  title="Cerrar"
                  role="button"
                  onClick={close}
                >
                  <i className="fa-solid fa-x fs-5" />
                </span>
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
};

export default Modal;

import { useTransition, animated } from "@react-spring/web";
import { createPortal } from "react-dom";
import { useHotkeys } from "react-hotkeys-hook";

function Modal({ show, close, title, children, darkMode, size }) {
  useHotkeys("esc", () => close());

  const modalSize = {
    sm: { width: "30%", height: "60%" },
    md: { width: "50%", height: "90%" },
    lg: { width: "90%", height: "90%" },
  };

  const transitions = useTransition(show, {
    from: { x: 0, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    leave: { x: 0, opacity: 0 },
    config: { duration: 300 },
  });
  const modalBoxTransition = useTransition(show, {
    from: { x: 0, y: 1000, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    leave: { x: 0, y: 1000, opacity: 0 },
    config: { duration: 200 },
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
            {modalBoxTransition(
              (styleBox, itemBox) =>
                itemBox && (
                  <animated.div
                    className={`modal-box ${
                      darkMode ? "bg-dark-mode-base text-white" : "bg-white"
                    } d-flex flex-column`}
                    style={{ ...styleBox, ...modalSize[size] }}
                  >
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
                    <div className="flex-grow-1 modal-cuerpo">{children}</div>
                  </animated.div>
                )
            )}
          </animated.div>
        )
    ),
    document.body
  );
}

Modal.defaultProps = {
  darkMode: false,
  size: "lg",
};

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

export const ModalBottom = ({ children }) => {
  return (
    <div className="d-flex justify-content-end align-items-center modal-bottom border-top w-100">
      {children}
    </div>
  );
};

export default Modal;

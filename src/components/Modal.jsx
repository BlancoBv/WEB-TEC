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
                      <h3>{title}</h3>
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

export const ModalConfirm = ({
  show,
  close,
  title,
  children,
  darkMode,
  action,
}) => {
  useHotkeys("esc", () => close());

  const modalSize = {
    xsm: { width: "20%", height: "30%" },
    sm: { width: "30%", height: "60%" },
    md: { width: "50%", height: "90%" },
    lg: { width: "90%", height: "90%" },
  };

  const handleAction = () => {
    action();
    close();
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
                    style={{ ...styleBox, ...modalSize["xsm"] }}
                  >
                    <div
                      className="modal-title border-bottom"
                      style={{ height: "25%" }}
                    >
                      <h3 className="text-danger">Advertencia</h3>
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
                    <div
                      className="d-flex justify-content-end align-items-center modal-bottom border-top w-100 gap-2"
                      style={{ height: "30%" }}
                    >
                      <button type="button" onClick={close}>
                        Cancelar
                      </button>
                      <button type="button" onClick={handleAction}>
                        Continuar
                      </button>
                    </div>
                  </animated.div>
                )
            )}
          </animated.div>
        )
    ),
    document.body
  );
};

ModalConfirm.defaultProps = {
  darkMode: false,
  size: "lg",
};

export const ModalBottom = ({ children }) => {
  return (
    <div className="d-flex justify-content-end align-items-center modal-bottom border-top w-100 gap-2">
      {children}
    </div>
  );
};

export default Modal;

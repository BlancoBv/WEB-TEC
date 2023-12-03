import { createPortal } from "react-dom";
import { useTransition, animated } from "@react-spring/web";

export const AlertSuccess = ({ show }) => {
  const transitions = useTransition(show, {
    from: { opacity: 0, y: -100, x: 0 },
    enter: { opacity: 1, y: 0, x: 0 },
    leave: { opacity: 0, y: -100, x: 0 },
  });

  return createPortal(
    transitions(
      (style, item) =>
        item && (
          <animated.div
            style={{ ...style, transform: "translate(-50%,0)" }}
            className="alert alert-success position-fixed top-0 start-50 translate-middle-x user-select-none mt-1 z-3"
            role="alert"
          >
            Datos guardados correctamente.
          </animated.div>
        )
    ),

    document.body
  );
};
export const AlertError = ({ show, text }) => {
  const transitions = useTransition(show, {
    from: { opacity: 0, y: -100, x: 0 },
    enter: { opacity: 1, y: 0, x: 0 },
    leave: { opacity: 0, y: -100, x: 0 },
  });

  return createPortal(
    transitions(
      (style, item) =>
        item && (
          <animated.div
            style={{ ...style, transform: "translate(-50%,0)" }}
            className="alert alert-danger position-fixed top-0 start-50 user-select-none mt-1 z-3"
            role="alert"
          >
            {text || "Error al guardar los datos"}
          </animated.div>
        )
    ),

    document.body
  );
};

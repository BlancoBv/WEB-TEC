import { createPortal } from "react-dom";
import { useTransition, animated } from "@react-spring/web";

export const AlertSuccess = ({ show }) => {
  const transitions = useTransition(show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return createPortal(
    transitions(
      (style, item) =>
        item && (
          <animated.div
            style={style}
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

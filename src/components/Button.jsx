import React from "react";
import Loader from "./Loader";
function Button({ action, type, pending, text, disabled }) {
  return (
    <button
      className="button-custom"
      onClick={action}
      type={type}
      disabled={disabled}
    >
      {pending ? <Loader loaderType="dots" size="2rem" /> : text}
    </button>
  );
}
Button.defaultProps = {
  action: undefined,
  type: "button",
  pending: false,
  text: "Texto de ejemplo",
  disabled: false,
};

export default Button;

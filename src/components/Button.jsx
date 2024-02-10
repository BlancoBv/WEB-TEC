import React from "react";
import Loader from "./Loader";
function Button({ action, type, pending, text }) {
  return (
    <button className="button-custom" onClick={action} type={type}>
      {pending ? <Loader loaderType="dots" size="2rem" /> : text}
    </button>
  );
}
Button.defaultProps = {
  action: undefined,
  type: "button",
  pending: false,
  text: "Texto de ejemplo",
};

export default Button;

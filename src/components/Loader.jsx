import React from "react";
import { MutatingDots } from "react-loader-spinner";

function Loader({ size, radius }) {
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <MutatingDots
        color="rgb(27, 57, 106)"
        secondaryColor="rgb(27, 57, 106)"
        visible={true}
        width={size}
        height={size}
        radius={radius}
      />
    </div>
  );
}
Loader.defaultProps = {
  size: "100",
  radius: "15",
};

export default Loader;

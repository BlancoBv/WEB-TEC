import React from "react";
import { MutatingDots, TailSpin, ThreeDots } from "react-loader-spinner";

function Loader({ size, radius, loaderType }) {
  const type = {
    mutating: (
      <MutatingDots
        color="rgb(27, 57, 106)"
        secondaryColor="rgb(27, 57, 106)"
        visible={true}
        width={size}
        height={size}
        radius={radius}
      />
    ),
    dots: (
      <ThreeDots
        visible={true}
        height={size}
        width={size}
        color="#ffffff"
        radius="9"
      />
    ),
  };
  return (
    <div className="flex-grow-1 d-flex justify-content-center align-items-center">
      {type[loaderType]}
    </div>
  );
}
Loader.defaultProps = {
  size: "100",
  radius: "15",
  loaderType: "mutating",
};

export default Loader;

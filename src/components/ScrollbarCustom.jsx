import React from "react";
import { Scrollbar } from "react-scrollbars-custom";

function ScrollbarCustom({ children, width, height }) {
  return (
    <Scrollbar style={{ width, height }} disableTracksWidthCompensation>
      {children}
    </Scrollbar>
  );
}
ScrollbarCustom.defaultProps = {
  width: "100%",
  height: "100%",
};

export default ScrollbarCustom;

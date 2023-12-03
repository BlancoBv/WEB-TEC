import React from "react";
import { Scrollbar } from "react-scrollbars-custom";

function ScrollbarCustom({ children, width, height }) {
  return (
    <Scrollbar
      style={{ width: width, height: height }}
      disableTracksWidthCompensation
    >
      {children}
    </Scrollbar>
  );
}

export default ScrollbarCustom;

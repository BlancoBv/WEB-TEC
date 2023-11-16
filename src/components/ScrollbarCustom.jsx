import React from "react";
import { Scrollbar } from "react-scrollbars-custom";

function ScrollbarCustom({ children, width, height }) {
  return <Scrollbar disableTracksWidthCompensation>{children}</Scrollbar>;
}

export default ScrollbarCustom;

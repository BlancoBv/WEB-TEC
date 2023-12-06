import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import Loader from "./Loader";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

function PDFViewer({ url }) {
  const defaultLayout = defaultLayoutPlugin();
  return (
    <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js">
      <Viewer
        fileUrl={url}
        renderLoader={() => <Loader />}
        //plugins={[defaultLayout]}
        theme="dark"
      />
    </Worker>
  );
}

export default PDFViewer;

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@fortawesome/fontawesome-free/css/solid.css";
import "@fortawesome/fontawesome-free/css/brands.css";
import "@fortawesome/fontawesome-free/css/fontawesome.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.esm";
import "bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
  /* <React.StrictMode>
    <App />
  </React.StrictMode> */
);

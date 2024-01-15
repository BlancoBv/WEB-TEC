import React from "react";

function NoContent() {
  return (
    <div className="no-content-container">
      <div className="icon-container">
        <i className="fa-solid fa-folder-open primary-icon" />
        <i className="fa-solid fa-circle-xmark secondary-icon" />
      </div>

      <div className="text-center">
        <h1>¡Sin datos!</h1>
        <span>Intenta añadir algo.</span>
      </div>
    </div>
  );
}

export default NoContent;

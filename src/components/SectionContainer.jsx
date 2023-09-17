import React from "react";

function SectionContainer({ title, children }) {
  return (
    <section className="w-100">
      <div className="blueBackground text-white blueMenu d-flex align-items-center justify-content-center">
        <h3>{title}</h3>
      </div>
      {children}
    </section>
  );
}
SectionContainer.defaultProps = {
  title: "Titulo de ejemplo",
};

export default SectionContainer;

import React from "react";

function SectionContainer({ title, children }) {
  return (
    <section className="section-container">
      <div className="section-content">
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
}
SectionContainer.defaultProps = {
  title: "Titulo de ejemplo",
};

export default SectionContainer;

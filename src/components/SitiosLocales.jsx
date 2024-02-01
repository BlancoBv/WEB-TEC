import React, { useEffect, useState } from "react";
import { useTransition, animated, useSpringRef } from "@react-spring/web";

function SitiosLocales() {
  const [index, setIndex] = useState(0);
  const transfRef = useSpringRef();

  const tarjetas = [
    {
      titulo: "Decreto de creación del TecNM",
      url: "https://rios.tecnm.mx/rios/vista/pdf/docanexo/decreto_tecnologico_nacional_mexico.pdf",
    },
    { titulo: "Codigo de etica de las personas ", url: "" },
    { titulo: "Comite", url: "" },
  ];
  const transitions = useTransition(index, {
    ref: transfRef,
    keys: null,
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(-50%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(0%,0,0)" },
  });

  const previousCard = () => {
    setIndex((prev) => {
      if (prev === 0) {
        return tarjetas.length - 1;
      }
      return (prev - 1) % tarjetas.length;
    });
  };

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % tarjetas.length);
  };

  useEffect(() => {
    transfRef.start();
  }, [index]);
  return (
    <div className="slider">
      <div className="prev-card-button" onClick={previousCard}>
        <i className="fa-solid fa-angle-left" />
      </div>
      <LocalSitesCard items={tarjetas} transitions={transitions} />
      <div className="next-card-button" onClick={nextCard}>
        <i className="fa-solid fa-angle-right" />
      </div>
    </div>
  );
}

const LocalSitesCard = ({ items, transitions }) => {
  return (
    <>
      {transitions((style, item) => (
        <animated.a
          href={items[item].url}
          style={{ ...style, left: "50%" }}
          target="_blank"
          className="slider-card-mobile"
        >
          {items[item].titulo}
        </animated.a>
      ))}
      {items.map((el) => (
        <a
          href={el.url}
          style={{ left: "50%" }}
          target="_blank"
          className="slider-card"
        >
          {el.titulo}
        </a>
      ))}
    </>
  );
};
export default SitiosLocales;

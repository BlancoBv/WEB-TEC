import React, { useEffect, useState } from "react";
import conacyt from "../assets/img/conacyt.png";
import itaip from "../assets/img/itaip.png";
import imss from "../assets/img/imss.png";
import inai from "../assets/img/inai.png";
import pnt from "../assets/img/pnt.png";
import { useSpringRef, useTransition, animated } from "@react-spring/web";

function SitiosInteres() {
  const [index, setIndex] = useState(0);
  const transfRef = useSpringRef();
  const transitions = useTransition(index, {
    ref: transfRef,
    keys: null,
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(-50%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(0%,0,0)" },
  });

  const items = [
    ({ style }) => (
      <animated.a
        style={style}
        href="https://conahcyt.mx/"
        className="slider-card"
      >
        <img src={conacyt} alt="Conacyt" />
      </animated.a>
    ),

    ({ style }) => (
      <animated.a
        style={style}
        href="http://www.imss.gob.mx/"
        className="slider-card"
      >
        <img src={imss} alt="IMSS" />
      </animated.a>
    ),
    ({ style }) => (
      <animated.a
        style={style}
        href="https://home.inai.org.mx"
        className="slider-card"
      >
        <img src={inai} alt="INAI" />
      </animated.a>
    ),
    ({ style }) => (
      <animated.a
        style={style}
        href="https://consultapublicamx.plataformadetransparencia.org.mx/"
        className="slider-card"
      >
        <img src={pnt} alt="PNT" />
      </animated.a>
    ),
  ];
  const previousCard = () => {
    setIndex((prev) => {
      if (prev === 0) {
        return items.length - 1;
      }
      return (prev - 1) % items.length;
    });
  };

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };
  useEffect(() => {
    transfRef.start();
  }, [index]);

  return (
    <div className="sitios-interes">
      <div className="prev-card-button" onClick={previousCard}>
        <i className="fa-solid fa-angle-left" />
      </div>
      <div className="slider-container">
        {transitions((style, item) => {
          const Page = items[item];
          return <Page style={{ ...style, left: "50%" }} />;
        })}
      </div>
      <>
        {items.map((Element, index) => (
          <Element key={index} />
        ))}
      </>
      <div className="next-card-button" onClick={nextCard}>
        <i className="fa-solid fa-angle-right" />
      </div>
    </div>
  );
}

export default SitiosInteres;

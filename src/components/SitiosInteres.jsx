import React, { useEffect, useState } from "react";
import { useSpringRef, useTransition, animated } from "@react-spring/web";
import useGetLocalData from "../hooks/useGetLocalData";

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
  const { data: items, isPending } = useGetLocalData(
    "/config/interestingSites.json"
  );

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
  console.log(items);

  return (
    <div className="sitios-interes">
      <div className="prev-card-button" onClick={previousCard}>
        <i className="fa-solid fa-angle-left" />
      </div>
      <div className="slider-container">
        {!isPending &&
          transitions((style, item) => (
            <animated.a
              style={style}
              href={items[item]["ruta"]}
              className="slider-card"
            >
              <img src={items[item]["imagen"]} alt={items[item]["alt"]} />
            </animated.a>
          ))}
      </div>
      <>
        {!isPending &&
          items.map((el, index) => (
            <animated.a href={el["ruta"]} className="slider-card" key={index}>
              <img src={el["imagen"]} alt={el["alt"]} />
            </animated.a>
          ))}
      </>
      <div className="next-card-button" onClick={nextCard}>
        <i className="fa-solid fa-angle-right" />
      </div>
    </div>
  );
}

export default SitiosInteres;

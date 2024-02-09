import React, { useEffect, useState } from "react";
import { useTransition, animated, useSpringRef } from "@react-spring/web";
import useGetLocalData from "../hooks/useGetLocalData";
//import tarjetas from "../configs/localSites.json";

function SitiosLocales() {
  const [index, setIndex] = useState(0);
  const transfRef = useSpringRef();

  const { data: tarjetas, isPending } = useGetLocalData(
    "/config/localSites.json"
  );

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
      {!isPending && (
        <LocalSitesCard items={tarjetas} transitions={transitions} />
      )}
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
      {items.map((el, index) => (
        <a
          href={el.url}
          style={{ left: "50%" }}
          target="_blank"
          className="slider-card"
          key={index}
        >
          {el.titulo}
        </a>
      ))}
    </>
  );
};
export default SitiosLocales;

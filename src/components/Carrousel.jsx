import { useTransition, animated } from "@react-spring/web";
import { useState } from "react";
import { urlMain } from "../axios/Axios";
import useGetData from "../hooks/useGetData";
import LoadingContent from "./LoadingContent";

function Carrousel() {
  const { data, isPending, error } = useGetData(
    "/banners/obtener?mostrar=vigentes"
  );

  return (
    <div className="carrousel">
      {!isPending && !error && <Success images={data.response} />}
      {isPending && <LoadingContent />}
      {!isPending && error && (
        <div className="no-carrousel">
          <div className="icon-container">
            <i className="fa-solid fa-images primary-icon" />
            <i className="fa-solid fa-circle-xmark secondary-icon" />
          </div>
          <div className="text-center">
            <h1>Nada por aquí...</h1>
            <span>Espera a que suban contenido.</span>
          </div>
        </div>
      )}
    </div>
  );
}

const Success = ({ images }) => {
  const [index, set] = useState(0);
  console.log(images);

  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 3000 },

    onRest: (_a, _b, item) => {
      if (index === item) {
        set((state) => (state + 1) % images.length);
      }
    },
    exitBeforeEnter: true,
  });
  return (
    <>
      {transitions((style, i) =>
        images[i]["url"] ? (
          <animated.a
            style={{
              ...style,
              width: "100%",
              height: "100%",
            }}
            href={images[i]["url"]}
            target="_blank"
          >
            <img src={`${urlMain}${images[i].imagen}`} width="100%" />
          </animated.a>
        ) : (
          <animated.div
            style={{
              ...style,
              width: "100%",
              height: "100%",
            }}
          >
            <img src={`${urlMain}${images[i].imagen}`} width="100%" />
          </animated.div>
        )
      )}
    </>
  );
};

export default Carrousel;

import { useTransition, animated } from "@react-spring/web";
import { useState } from "react";
import { urlMain } from "../axios/Axios";
import useGetData from "../hooks/useGetData";
import LoadingContent from "./LoadingContent";

function Carrousel() {
  const { data, isPending } = useGetData("/banners/obtener?mostrar=vigentes");

  return (
    <div className="carrousel">
      {!isPending && data.response.length > 0 && (
        <Success images={data.response} />
      )}
      {isPending && <LoadingContent />}
    </div>
  );
}

const Success = ({ images }) => {
  const [index, set] = useState(0);

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
      {transitions((style, i) => (
        <animated.div
          style={{
            ...style,
            width: "100%",
            height: "100%",
          }}
        >
          <img src={`${urlMain}${images[i].imagen}`} width="100%" />
        </animated.div>
      ))}
    </>
  );
};

export default Carrousel;

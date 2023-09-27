import { useTransition, animated } from "@react-spring/web";
import { useState } from "react";

function Carrousel({ images }) {
  const [index, set] = useState(0);

  const ola = [
    "https://placehold.co/500x400",
    "https://placehold.co/800x400",
    "https://placehold.co/600x400",
  ];

  const transitions = useTransition(index, {
    key: null,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 2000 },
    onRest: (_a, _b, item) => {
      if (index === item) {
        set((state) => (state + 1) % ola.length);
      }
    },
    exitBeforeEnter: true,
  });
  return (
    <div className="carrousel">
      {/*  */}
      {transitions((style, i) => (
        <animated.div
          style={{
            ...style,
            backgroundImage: `url(${ola[i]})`,
            width: "100%",
            height: "100%",
          }}
        />
      ))}
    </div>
  );
}

export default Carrousel;

import { useTransition, animated } from "@react-spring/web";
import { useState } from "react";
import { urlMain } from "../axios/Axios";

function Carrousel({ images }) {
  /**
   * Esta instruccion resuelve la problematica de si no existe o hay elementos vacios en la BD regresa parametros predeterminados
   * @returns {Array} Returna un arreglo con las rutas de las imagenes.
   */
  images = (images &&
    images.length > 0 &&
    images.map((img) => ({ imagen: urlMain + img.imagen }))) || [
    { imagen: "https://placehold.co/500x400" },
    { imagen: "https://placehold.co/800x400" },
    { imagen: "https://placehold.co/600x400" },
  ];

  console.log(images);

  const [index, set] = useState(0);
  const [isManualChanged, setIsManualChanged] = useState(false);

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

  const manualChange = (e) => {
    const { id } = e.target;
    setIsManualChanged(true);
    set(Number(id));
  };
  /* 
  useEffect(() => {
    if (isManualChanged) {
      setTimeout(() => {
        setIsManualChanged(false);
      }, 2000);
    }
  }, [isManualChanged, setIsManualChanged]); */

  return (
    <div>
      <div className="carrousel">
        {/*  */}
        {transitions((style, i) => (
          <animated.div
            style={{
              ...style,
              backgroundImage: `url(${images[i].imagen})`,
              width: "100%",
              height: "100%",
            }}
          />
        ))}
      </div>
      {/*  <div className="d-flex justify-content-center gap-3 p-2">
        {images.map((el, i) => (
          <i
            key={el.idbanner}
            id={i}
            className="fa-regular fa-circle-dot"
            onClick={manualChange}
          />
        ))}
      </div> */}
    </div>
  );
}

export default Carrousel;

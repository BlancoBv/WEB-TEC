import Axios from "../../axios/Axios";
import Carrousel from "../../components/Carrousel";
import ConvocatoriaCard from "../../components/ConvocatoriaCard";
import Mapa from "../../components/Mapa";
import NoticiaCard from "../../components/NoticiaCard";
import SectionContainer from "../../components/SectionContainer";
import useGetData from "../../hooks/useGetData";

function Home() {
  const { data, isPending, error } = useGetData(
    "/banners/obtener?mostrar=vigentes"
  );
  const blogs = useGetData("/blogs/obtener?estatus=aceptado");
  const convocatorias = useGetData("/convocatorias/obtener");

  return (
    <div>
      {!isPending && !error && data.response && (
        <Carrousel images={data.response} />
      )}

      <SectionContainer title="Noticias">
        <div className="w-100 h-100 d-flex justify-content-evenly p-2">
          {!blogs.isPending &&
            blogs.data.response.map((el, i) => (
              <NoticiaCard key={i} element={el} />
            ))}
        </div>
      </SectionContainer>
      <SectionContainer title="Convocatorias">
        <div className="d-flex justify-content-evenly align-items-center flex-column flex-md-row">
          {!convocatorias.isPending &&
            convocatorias.data.response.map((el) => (
              <ConvocatoriaCard element={el} />
            ))}
        </div>
      </SectionContainer>
      <SectionContainer title="Redes sociales">
        <div className="d-flex align-items-center justify-content-evenly p-2">
          <div className="w-25">
            <a
              className="twitter-timeline"
              data-lang="es"
              data-dnt="true"
              href="https://twitter.com/soytecrios?ref_src=twsrc%5Etfw"
            >
              Tweets by soytecrios
            </a>
          </div>
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ftecnmdelosrios%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            width="340"
            height="500"
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </div>
      </SectionContainer>
    </div>
  );
}

export default Home;

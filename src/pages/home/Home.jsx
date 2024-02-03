import Carrousel from "../../components/Carrousel";
import Convocatorias from "../../components/Convocatorias";
import Noticias from "../../components/Noticias";
import SectionContainer from "../../components/SectionContainer";

function Home() {
  return (
    <>
      <Carrousel />
      <SectionContainer title="Noticias">
        <Noticias />
      </SectionContainer>
      <SectionContainer title="Convocatorias">
        <Convocatorias />
      </SectionContainer>
      <SectionContainer title="Redes sociales">
        <div className="d-flex align-items-center justify-content-evenly p-2 ">
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
    </>
  );
}

export default Home;

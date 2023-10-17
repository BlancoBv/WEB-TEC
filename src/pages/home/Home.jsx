import Axios from "../../axios/Axios";
import Carrousel from "../../components/Carrousel";
import Mapa from "../../components/Mapa";
import NoticiaCard from "../../components/NoticiaCard";
import SectionContainer from "../../components/SectionContainer";
import useGetData from "../../hooks/useGetData";

function Home() {
  const Noticias = [
    {
      img: "https://placehold.co/600x400",
      title: "Que ta chendo ramirez",
      fecha: "2023-05-20",
    },
    {
      img: "https://placehold.co/600x400",
      title: "Ola ramirez",
      fecha: "2023-05-20",
    },
    {
      img: "https://placehold.co/600x400",
      title: "Ola ramirez",
      fecha: "2023-05-20",
    },
    {
      img: "https://placehold.co/600x400",
      title: "Ola ramirez",
      fecha: "2023-05-20",
    },
    {
      img: "https://placehold.co/600x400",
      title: "Ola ramirez",
      fecha: "2023-05-20",
    },
    {
      img: "https://placehold.co/600x400",
      title: "Ola ramirez",
      fecha: "2023-05-20",
    },
    {
      img: "https://placehold.co/600x400",
      title: "Ola ramirez",
      fecha: "2023-05-20",
    },
    {
      img: "https://placehold.co/600x400",
      title: "Ola ramirez",
      fecha: "2023-05-20",
    },
    {
      img: "https://placehold.co/600x400",
      title: "Ola ramirez",
      fecha: "2023-05-20",
    },
    {
      img: "https://placehold.co/600x400",
      title: "Ola ramirez",
      fecha: "2023-05-20",
    },
    {
      img: "https://placehold.co/600x400",
      title: "Ola ramirez",
      fecha: "2023-05-20",
    },
  ];

  const { data, isPending, error } = useGetData(
    "/banners/obtener?mostrar=vigentes"
  );

  const blogs = useGetData("/blogs/obtener");
  console.log(blogs);

  return (
    <div>
      {!isPending && !error && data.response && (
        <Carrousel images={data.response} />
      )}

      <SectionContainer title="Noticias">
        <div className="w-100 h-100 d-flex overflow-x-auto">
          {!blogs.isPending &&
            blogs.data.response.map((el, i) => (
              <NoticiaCard key={i} element={el} />
            ))}
        </div>
      </SectionContainer>
      <SectionContainer title="Convocatorias">
        <p>Texto de ejemplo</p>
        <p>Texto de ejemplo</p>
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

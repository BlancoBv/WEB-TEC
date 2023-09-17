import Carrousel from "../../components/Carrousel";
import Mapa from "../../components/Mapa";
import NoticiaCard from "../../components/NoticiaCard";
import SectionContainer from "../../components/SectionContainer";

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
  return (
    <div>
      <Carrousel />
      <SectionContainer title="Noticias">
        <div className="w-100 h-100 d-flex overflow-x-auto">
          {Noticias.map((el) => (
            <NoticiaCard element={el} />
          ))}
        </div>
      </SectionContainer>
      <SectionContainer title="Convocatorias">
        <Mapa />
      </SectionContainer>
    </div>
  );
}

export default Home;

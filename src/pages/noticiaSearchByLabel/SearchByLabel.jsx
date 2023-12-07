import { useParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import Loader from "../../components/Loader";
import NoticiaCard from "../../components/NoticiaCard";

function SearchByLabel() {
  const { label } = useParams();
  const { data, isPending } = useGetData(`/blogs/filtrar?etiqueta=${label}`);

  console.log(!isPending && data.response[0][0]);
  return (
    <div className="search-label-container">
      <h3>Buscando noticias en etiqueta: {label}</h3>
      {!isPending && (
        <div className="w-100 h-100 d-flex flex-wrap justify-content-evenly">
          {data.response[0][0].blogs.map((el) => (
            <NoticiaCard element={el} />
          ))}
        </div>
      )}
      {isPending && (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default SearchByLabel;

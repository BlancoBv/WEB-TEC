import {
  createBrowserRouter as Router,
  RouterProvider,
} from "react-router-dom";
import IndexLayout from "../layout/IndexLayout";
import Antecedentes from "../pages/conocenos/Antecedentes";
import Home from "../pages/home/Home";
import IndexMenu from "../pages/userMenu/IndexMenu";
import AddNoticias from "../pages/userMenu/sections/noticias/AddNoticias";
import Banners from "../pages/userMenu/sections/Banners";
import BaseNoticias from "../pages/userMenu/sections/noticias/Noticias_Index";
import Noticias_Index from "../pages/userMenu/sections/noticias/Noticias_Index";
import NoticiasPendientes from "../pages/userMenu/sections/noticias/NoticiasPendientes";
import ListaNoticias from "../pages/userMenu/sections/noticias/ListaNoticias";
import Convocatorias_Index from "../pages/userMenu/sections/convocatorias/Convocatorias_Index";
import ListaConvocatorias from "../pages/userMenu/sections/convocatorias/ListaConvocatorias";
import AddConvocatoria from "../pages/userMenu/sections/convocatorias/AddConvocatoria";
import SearchByLabel from "../pages/noticiaSearchByLabel/SearchByLabel";
import Labels_Index from "../pages/userMenu/sections/etiquetas/Labels_Index";
import ManageLabels from "../pages/userMenu/sections/etiquetas/ManageLabels";

function Routes() {
  const rutas = Router([
    {
      path: "/",
      element: <IndexLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "antecedentes", element: <Antecedentes /> },
        { path: "search/:label", element: <SearchByLabel /> },
      ],
    },
    {
      path: "menu",
      element: <IndexMenu />,
      children: [
        {
          path: "noticias",
          element: <Noticias_Index />,
          children: [
            { index: true, element: <ListaNoticias /> },
            {
              path: "crear",
              element: <AddNoticias />,
            },
            { path: "pendientes", element: <NoticiasPendientes /> },
          ],
        },
        { path: "banners", element: <Banners /> },
        {
          path: "convocatorias",
          element: <Convocatorias_Index />,
          children: [
            { index: true, element: <ListaConvocatorias /> },
            {
              path: "crear",
              element: <AddConvocatoria />,
            },
          ],
        },
        {
          path: "etiquetas",
          element: <Labels_Index />,
          children: [{ index: true, element: <ManageLabels /> }],
        },
      ],
    },
  ]);
  return <RouterProvider router={rutas} />;
}

export default Routes;

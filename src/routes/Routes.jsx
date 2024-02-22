import {
  createBrowserRouter as Router,
  RouterProvider,
  redirect,
} from "react-router-dom";
import IndexLayout from "../layout/IndexLayout";
import Home from "../pages/home/Home";
import IndexMenu from "../pages/userMenu/IndexMenu";
import AddNoticias from "../pages/userMenu/sections/noticias/AddNoticias";
import Noticias_Index from "../pages/userMenu/sections/noticias/Noticias_Index";
import NoticiasPendientes from "../pages/userMenu/sections/noticias/NoticiasPendientes";
import ListaNoticias from "../pages/userMenu/sections/noticias/ListaNoticias";
import Convocatorias_Index from "../pages/userMenu/sections/convocatorias/Convocatorias_Index";
import ListaConvocatorias from "../pages/userMenu/sections/convocatorias/ListaConvocatorias";
import AddConvocatoria from "../pages/userMenu/sections/convocatorias/AddConvocatoria";
import SearchByLabel from "../pages/noticiaSearchByLabel/SearchByLabel";
import Labels_Index from "../pages/userMenu/sections/etiquetas/Labels_Index";
import ManageLabels from "../pages/userMenu/sections/etiquetas/ManageLabels";
import Menus_Index from "../pages/userMenu/sections/menus/Menus_Index";
import ListaMenus from "../pages/userMenu/sections/menus/ListaMenus";
import AddMenu from "../pages/userMenu/sections/menus/AddMenu";
import useGetData from "../hooks/useGetData";
import Article from "../components/Article";
import Loader from "../components/Loader";
import EditArticulos from "../pages/userMenu/sections/articulos/EditArticulos";
import Login from "../pages/login/Login";
import Banners_index from "../pages/userMenu/sections/banners/Banners_index";
import ListaBanners from "../pages/userMenu/sections/banners/ListaBanners";
import Menus_Sec_Index from "../pages/userMenu/sections/menusSecundarios/Menus_Sec_Index";
import ListaMenusSec from "../pages/userMenu/sections/menusSecundarios/ListaMenusSec";
import AddMenuSec from "../pages/userMenu/sections/menusSecundarios/AddMenuSec";
import Users_index from "../pages/userMenu/sections/usuarios/Users_index";
import ListaUsuarios from "../pages/userMenu/sections/usuarios/ListaUsuarios";
import ListaPermisos from "../pages/userMenu/sections/usuarios/ListaPermisos";
import ListaRoles from "../pages/userMenu/sections/usuarios/ListaRoles";

function Routes() {
  const { data, isPending, error } = useGetData("/categorias/obtener");
  const rutasIndex = [
    { index: true, element: <Home /> },
    { path: "search/:label", element: <SearchByLabel /> },
  ];
  const rutasPanel = {
    path: "panel",
    element: <IndexMenu />,
    children: [
      {
        path: "article/:ruta",
        element: <EditArticulos />,
      },
      ,
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
      {
        path: "banners",
        element: <Banners_index />,
        children: [{ index: true, element: <ListaBanners /> }],
      },
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
      {
        path: "menus-control",
        element: <Menus_Index />,
        children: [
          { index: true, element: <ListaMenus /> },
          { path: "crear", element: <AddMenu /> },
        ],
      },
      {
        path: "menus-control-secundarios",
        element: <Menus_Sec_Index />,
        children: [
          { index: true, element: <ListaMenusSec /> },
          { path: "crear", element: <AddMenuSec /> },
        ],
      },
      {
        path: "user-control",
        element: <Users_index />,
        children: [
          { index: true, element: <ListaUsuarios /> },
          { path: "roles", element: <ListaRoles /> },
          { path: "permisos", element: <ListaPermisos /> },
        ],
      },
    ],
  };
  const rutas = [
    {
      path: "/",
      element: <IndexLayout />,
      children: rutasIndex,
      errorElement: <div>Pagina no encontrada</div>,
    },
    {
      path: "/login",
      index: true,
      element: <Login />,
      /*   loader: () => {
        const user = localStorage.getItem("user");
        if (user) {
          return redirect("/panel");
        }
        return null;
      }, */
    },
  ];

  !isPending &&
    data.response.forEach((ruta) => {
      if (ruta.dropcollapse) {
        rutasIndex.push({
          path: ruta.ruta,
          children: ruta.subcategorias.map((el) => ({
            path: el.ruta,
            element: <Article ruta={el.ruta} />,
          })),
        });
      } else {
        rutasIndex.push({
          path: ruta.ruta,
          children: [{ index: true, element: <Article ruta={ruta.ruta} /> }],
        });
      }
    });
  const token = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).token
    : null;

  console.log({ data, isPending, error });

  return (
    !isPending && (
      <RouterProvider
        router={Router(token ? [...rutas, rutasPanel] : rutas)}
        fallbackElement={<Loader />}
      />
    )
  );
}

export default Routes;

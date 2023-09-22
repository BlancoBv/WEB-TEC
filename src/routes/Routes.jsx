import {
  createBrowserRouter as Router,
  RouterProvider,
} from "react-router-dom";
import IndexLayout from "../layout/IndexLayout";
import Antecedentes from "../pages/conocenos/Antecedentes";
import Home from "../pages/home/Home";
import IndexMenu from "../pages/userMenu/IndexMenu";
import Menu from "../pages/userMenu/Menu";

function Routes() {
  const rutas = Router([
    {
      path: "/",
      element: <IndexLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "antecedentes", element: <Antecedentes /> },
      ],
    },
    {
      path: "menu",
      element: <IndexMenu />,
      children: [{ index: true, element: <Menu /> }],
    },
  ]);
  return <RouterProvider router={rutas} />;
}

export default Routes;

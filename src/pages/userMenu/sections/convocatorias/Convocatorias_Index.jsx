import React from "react";
import { NavigationMenuUser } from "../../layout/Base";
import { Outlet } from "react-router-dom";
import Perm from "../../../../auth/Perm";

function Convocatorias_Index() {
  const tabs = [
    { name: "Lista", route: "", icon: "fa-solid fa-table-list", show: true },
    {
      name: "Crear",
      route: "crear",
      icon: "fa-solid fa-square-plus",
      show: Perm(13),
    },
  ];

  return (
    <div className="w-100 h-100 d-flex flex-column">
      <NavigationMenuUser tabs={tabs} mainRoute="noticias" />
      <div className="flex-grow-1">
        <Outlet />
      </div>
    </div>
  );
}

export default Convocatorias_Index;

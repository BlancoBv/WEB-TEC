import React from "react";
import { NavigationMenuUser } from "../../layout/Base";
import { Outlet } from "react-router-dom";

function Convocatorias_Index() {
  const tabs = [
    { name: "Lista", route: "", icon: "fa-solid fa-table-list" },
    { name: "Crear", route: "crear", icon: "fa-solid fa-square-plus" },
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

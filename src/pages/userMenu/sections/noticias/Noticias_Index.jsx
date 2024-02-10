import React from "react";
import { NavigationMenuUser } from "../../layout/Base";
import { Outlet } from "react-router-dom";

function Noticias_Index() {
  const tabs = [
    { name: "Lista", route: "", icon: "fa-solid fa-table-list" },
    { name: "Crear", route: "crear", icon: "fa-solid fa-square-plus" },
    { name: "Pendientes", route: "pendientes", icon: "fa-solid fa-clock" },
  ];

  return (
    <div className="w-100 h-90 d-flex flex-column">
      <NavigationMenuUser tabs={tabs} mainRoute="noticias" />
      <div className="h-90">
        <Outlet />
      </div>
    </div>
  );
}

export default Noticias_Index;

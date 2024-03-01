import React from "react";
import { NavigationMenuUser } from "../../layout/Base";
import { Outlet } from "react-router-dom";
import Perm from "../../../../auth/Perm";

function Noticias_Index() {
  const tabs = [
    { name: "Lista", route: "", icon: "fa-solid fa-table-list", show: true },
    {
      name: "Crear",
      route: "crear",
      icon: "fa-solid fa-square-plus",
      show: Perm(8),
    },
    {
      name: "Pendientes",
      route: "pendientes",
      icon: "fa-solid fa-clock",
      show: Perm(9),
    },
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
